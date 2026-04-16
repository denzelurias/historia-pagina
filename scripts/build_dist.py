#!/usr/bin/env python3
"""Build a clean deployable folder for the static site."""

from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"


def copy_path(source: Path, target: Path) -> None:
    if source.is_dir():
        shutil.copytree(source, target, dirs_exist_ok=True)
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)


def main() -> int:
    if DIST.exists():
        shutil.rmtree(DIST)

    DIST.mkdir(parents=True, exist_ok=True)

    for relative in [
        Path("index.html"),
        Path("quiz.html"),
        Path("styles.css"),
        Path("script.js"),
        Path(".nojekyll"),
        Path("assets/illustrations"),
        Path("assets/leaflet"),
    ]:
        copy_path(ROOT / relative, DIST / relative)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
