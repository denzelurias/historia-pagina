# AGENTS.md

## Propósito del repositorio
Construir un sitio web de historia en español, visualmente elegante y académicamente claro, inspirado en los temas abordados en la clase. La página debe funcionar como un recorrido histórico coherente y atractivo.

## Objetivo principal
Crear una web tipo museo digital o exposición interactiva sobre los grandes temas del curso, desde el mundo prehispánico hasta la independencia y la consolidación republicana.

## Regla central
La web **no** debe estar centrada en el alumno, sus tareas o una autobiografía escolar. El foco es el contenido histórico, sus procesos, sus conexiones y su valor cultural.

## Público
- Profesora de historia.
- Compañeros de clase.
- Visitantes que necesiten una introducción clara, atractiva y visual al periodo estudiado.

## Resultado esperado
Un sitio estático, responsive y fácil de abrir o desplegar, con narrativa clara, buena jerarquía visual y al menos un componente interactivo.

## Stack preferido
Usa **HTML + CSS + JavaScript vanilla** por defecto, salvo que el repositorio ya tenga un framework configurado.

Motivos:
- mayor portabilidad;
- despliegue sencillo en GitHub Pages o Netlify;
- menos complejidad innecesaria;
- más fácil de revisar y editar.

## Flujo de trabajo obligatorio
1. Leer `docs/project-brief.md` antes de escribir código.
2. Proponer o materializar una estructura del sitio clara.
3. Construir primero la base visual y de navegación.
4. Integrar el contenido histórico por secciones.
5. Añadir interactividad ligera y útil.
6. Revisar legibilidad, coherencia, ortografía y responsive design.
7. Entregar una versión navegable sin texto de relleno.

## Secciones mínimas del sitio
1. Inicio / portada
2. Línea del tiempo
3. Culturas prehispánicas
4. Conquista y controversias
5. Nueva España global
6. Sociedad y vida cotidiana novohispana
7. Barroco e Ilustración
8. Misiones jesuíticas y expansión del norte novohispano
9. Independencia y consolidación republicana
10. Fuentes / bibliografía

## Requisitos de contenido
- Todo el contenido debe estar en español.
- Redactar con tono claro, culto y accesible.
- Explicar procesos históricos, no solo listar datos.
- Mostrar conexiones entre temas: continuidad, cambio, tensiones, redes globales, vida cotidiana, cultura y poder.
- Evitar copiar fragmentos largos de las fuentes. Parafrasear y sintetizar.
- No usar Lorem Ipsum ni texto genérico.

## Dirección visual
La estética debe sentirse como:
- museo digital;
- dossier editorial elegante;
- exposición histórica contemporánea.

Evitar:
- apariencia de plantilla escolar genérica;
- colores neón;
- exceso de animaciones;
- saturación visual;
- estilo meme o informal.

## Guía visual sugerida
- Fondo claro cálido o tono pergamino.
- Contrastes sobrios con acentos oscuros.
- Encabezados con serif elegante.
- Cuerpo con sans-serif muy legible.
- Uso moderado de líneas, marcos, tarjetas, citas y bloques cronológicos.

## Interacciones recomendadas
Incluir al menos una o dos de estas:
- línea del tiempo interactiva;
- tarjetas expandibles;
- glosario histórico;
- quiz breve;
- mapa o rutas visuales simplificadas;
- modales para figuras, conceptos o imágenes.

Las interacciones deben ayudar a comprender mejor el contenido, no distraer.

## Requisitos técnicos
- Diseño responsive para móvil, tablet y escritorio.
- Navegación clara y estable.
- HTML semántico.
- CSS ordenado y reusable.
- JavaScript ligero.
- Carga rápida.
- Accesibilidad básica: contraste suficiente, texto legible, foco visible, imágenes con `alt`.

## Organización de archivos sugerida
- `index.html`
- `styles.css`
- `script.js`
- `assets/` (opcional)
- `docs/project-brief.md`
- `README.md`

## Prioridades temáticas
Dar prioridad a la coherencia narrativa entre:
- mundo prehispánico;
- conquista y debate sobre la condición de los indígenas;
- organización del virreinato;
- circulación de información y comercio transoceánico;
- sociedad novohispana y vida cotidiana;
- barroco e ilustración;
- misiones jesuíticas;
- independencia y construcción republicana.

## Componentes sugeridos
- hero section con título potente;
- menú fijo o semitransparente;
- bloque introductorio sobre el arco temporal del curso;
- línea del tiempo central;
- secciones temáticas con tarjetas o columnas;
- citas cortas destacadas;
- sección final de fuentes.

## Qué significa “hecho”
El trabajo se considera terminado cuando:
- el sitio abre correctamente;
- todas las secciones mínimas existen;
- el contenido es coherente y está en español;
- el diseño se ve cuidado y no improvisado;
- no hay texto placeholder;
- la web funciona bien en móvil y escritorio;
- hay una sección de fuentes o créditos;
- el proyecto puede compartirse sin ajustes urgentes.

## Qué no hacer
- No convertir la web en una página personal del alumno.
- No llenar la página con párrafos interminables.
- No usar efectos pesados o innecesarios.
- No introducir datos históricos dudosos sin revisar el material del proyecto.
- No usar una estructura caótica.

## Instrucción inicial recomendada
Antes de programar, revisa `docs/project-brief.md` y usa ese documento como guía principal de contenido, arquitectura y tono.

## Image Generation Rules

- Use the imageGenerator utility for all images
- Each section must include at least one generated image
- Maintain consistent visual style: historical, realistic, academic
- Do NOT use random prompts
- Prompts must reflect the historical topic of the section