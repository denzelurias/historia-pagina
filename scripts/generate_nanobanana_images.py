#!/usr/bin/env python3
"""Generate museum-style images for the site using the Gemini image API.

The script is intentionally dependency-free and will:
1. Read the API key from `GEMINI_API_KEY`, `GOOGLE_API_KEY`, or `.env`.
2. Load prompts from `assets/image-prompts.json`.
3. Save returned images under `assets/generated/`.

Expected `.env` formats:
  GEMINI_API_KEY=your_key_here
  GOOGLE_API_KEY=your_key_here
  your_key_here
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PROMPTS_FILE = ROOT / "assets" / "image-prompts.json"
OUTPUT_DIR = ROOT / "assets" / "generated"
DEFAULT_MODEL = "gemini-2.5-flash-image"
API_URL_TEMPLATE = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "{model}:generateContent?key={api_key}"
)


def load_key_from_env_file(env_path: Path) -> str | None:
    if not env_path.exists():
      return None

    raw = env_path.read_text(encoding="utf-8").strip()
    if not raw:
        return None

    # Support the case where the user pasted the key directly as the whole file.
    if "\n" not in raw and "=" not in raw and not raw.startswith("#"):
        return raw

    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        if key.strip() in {"GEMINI_API_KEY", "GOOGLE_API_KEY"}:
            return value.strip().strip("\"'")

    return None


def resolve_api_key() -> str | None:
    for env_name in ("GEMINI_API_KEY", "GOOGLE_API_KEY"):
        value = os.environ.get(env_name)
        if value:
            return value.strip()
    return load_key_from_env_file(ROOT / ".env")


def load_specs() -> list[dict[str, str]]:
    data = json.loads(PROMPTS_FILE.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("`assets/image-prompts.json` debe contener una lista.")
    return data


def build_payload(prompt: str) -> dict:
    return {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt,
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
        },
    }


def file_suffix_from_mime(mime_type: str) -> str:
    extension = mimetypes.guess_extension(mime_type)
    if extension:
        return extension
    return ".png"


def find_image_part(response_json: dict) -> tuple[bytes, str, str | None]:
    text_note = None

    for candidate in response_json.get("candidates", []):
        content = candidate.get("content", {})
        for part in content.get("parts", []):
            inline = part.get("inlineData")
            if inline and inline.get("data") and inline.get("mimeType"):
                return (
                    base64.b64decode(inline["data"]),
                    inline["mimeType"],
                    text_note,
                )
            if "text" in part and not text_note:
                text_note = part["text"]

    raise ValueError(
        "La respuesta no incluyó una imagen. Respuesta parcial: "
        + json.dumps(response_json)[:700]
    )


def generate_one(spec: dict[str, str], api_key: str, model: str) -> dict[str, str]:
    url = API_URL_TEMPLATE.format(
        model=urllib.parse.quote(model, safe=""),
        api_key=urllib.parse.quote(api_key, safe=""),
    )
    payload = json.dumps(build_payload(spec["prompt"])).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        if error.code == 429:
            raise RuntimeError(
                f"Error HTTP 429 al generar `{spec['id']}`. "
                "La API key no tiene cuota disponible para modelos de imagen "
                "o el proyecto necesita billing habilitado. "
                f"Detalle: {detail}"
            ) from error
        raise RuntimeError(
            f"Error HTTP {error.code} al generar `{spec['id']}`: {detail}"
        ) from error

    response_json = json.loads(body)
    image_bytes, mime_type, text_note = find_image_part(response_json)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    target_name = spec["filename"]
    target_path = OUTPUT_DIR / target_name

    desired_suffix = Path(target_name).suffix
    detected_suffix = file_suffix_from_mime(mime_type)
    if not desired_suffix:
        target_path = target_path.with_suffix(detected_suffix)

    target_path.write_bytes(image_bytes)

    return {
        "id": spec["id"],
        "placement": spec["placement"],
        "alt": spec["alt"],
        "path": str(target_path.relative_to(ROOT)),
        "mime_type": mime_type,
        "note": text_note or "",
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Genera imágenes curatoriales con Gemini/Nano Banana."
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help=f"Modelo a usar. Por defecto: {DEFAULT_MODEL}",
    )
    parser.add_argument(
        "--only",
        nargs="*",
        default=[],
        help="IDs concretos a generar, por ejemplo: hero barroco misiones",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Pausa en segundos entre solicitudes para un flujo más suave.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    api_key = resolve_api_key()
    if not api_key:
        print(
            "No encontré una API key. Guarda `GEMINI_API_KEY=...` en `.env` "
            "o exporta `GEMINI_API_KEY`/`GOOGLE_API_KEY`.",
            file=sys.stderr,
        )
        return 1

    specs = load_specs()
    if args.only:
        wanted = set(args.only)
        specs = [spec for spec in specs if spec["id"] in wanted]
        missing = wanted.difference({spec["id"] for spec in specs})
        if missing:
            print(
                "IDs no encontrados en `assets/image-prompts.json`: "
                + ", ".join(sorted(missing)),
                file=sys.stderr,
            )
            return 1

    manifest: list[dict[str, str]] = []

    for index, spec in enumerate(specs, start=1):
        print(f"[{index}/{len(specs)}] Generando `{spec['id']}`...")
        result = generate_one(spec, api_key=api_key, model=args.model)
        manifest.append(result)
        print(f"Guardada en {result['path']}")
        if index < len(specs) and args.delay > 0:
            time.sleep(args.delay)

    manifest_path = OUTPUT_DIR / "manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Manifest escrito en {manifest_path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
