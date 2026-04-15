# Archivo de una Transformación

Sitio web estático en español sobre el mundo prehispánico, la conquista, la Nueva España y la consolidación republicana, concebido como una exposición digital de historia.

## Archivos principales

- `index.html`: estructura semántica del recorrido.
- `styles.css`: sistema visual editorial inspirado en `docs/DESIGN.md`.
- `script.js`: interacciones ligeras para menú móvil, línea del tiempo, módulos expandibles y quiz final.
- `assets/image-prompts.json`: prompts curatoriales para generar imágenes con Gemini/Nano Banana.
- `scripts/generate_nanobanana_images.py`: generador reproducible de imágenes vía API.
- `scripts/build_dist.py`: crea una carpeta `dist/` limpia y lista para publicar.

## Cómo abrirlo

Abre `index.html` directamente en tu navegador o publícalo como sitio estático en GitHub Pages, Netlify o cualquier hosting similar.

## Generar imágenes con Gemini

1. Guarda tu API key en `.env` como `GEMINI_API_KEY=...`.
2. Ejecuta:

```bash
python3 scripts/generate_nanobanana_images.py
```

3. Las imágenes se guardarán en `assets/generated/`.

También puedes generar solo algunas escenas:

```bash
python3 scripts/generate_nanobanana_images.py --only hero barroco misiones
```

Si la API devuelve un error de cuota, el sitio sigue funcionando con las ilustraciones editoriales locales incluidas en `assets/illustrations/`.

## Publicación

Para preparar una carpeta segura para subir a un hosting estático:

```bash
python3 scripts/build_dist.py
```

Esto crea `dist/` con solo los archivos públicos del sitio, sin `.env`, sin `docs/` y sin scripts internos.

Opciones rápidas:

- Netlify Drop: sube la carpeta `dist/` a https://app.netlify.com/drop
- GitHub Pages: sube el proyecto a un repositorio y publica desde la rama principal o desde GitHub Actions

## Criterio de diseño

La propuesta busca sentirse como un museo digital contemporáneo: fondo papel cálido, tonos tinta y arcilla, tipografía con contraste editorial y navegación clara tanto en móvil como en escritorio.
