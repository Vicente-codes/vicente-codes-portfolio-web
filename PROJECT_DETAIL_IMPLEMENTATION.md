# Implementación de la vista de detalle de proyecto

Documentación de los cambios pendientes de commit en:

- `src/components/ProjectDetail.tsx`
- `src/assets/styles/ProjectDetail.scss`

---

## 1. Contexto y alcance

La página de detalle de proyecto (`/project/:slug`) se ha rediseñado por completo para convertirla en una ficha técnica completa y accesible: cabecera editorial, stack tecnológico, medio principal (imagen o vídeo), secciones semánticas, tarjetas de retos técnicos y una galería lightbox navegable con teclado.

Además de los dos ficheros anteriores, el conjunto de cambios pendientes incluye:

- `src/data/projects.ts`: se actualiza el import de la imagen de detalle del proyecto de portafolio, pasando de `cc/ccHeroVideo.png` a `vc/project-detail.png`.
- `src/assets/images/vc/project-detail.png`: nueva captura usada por ese import (actualmente sin trackear).
- El resto de ficheros modificados en `git status` corresponden, en su mayoría, a normalización de finales de línea (CRLF/LF). El cambio funcional relevante para esta vista está concentrado en los ficheros documentados aquí.

Verificación realizada:

- `npx tsc --noEmit` compila sin errores.
- `npx sass src/assets/styles/ProjectDetail.scss` compila la hoja de estilos sin errores.

---

## 2. `src/components/ProjectDetail.tsx`

### 2.1 Imports nuevos

Se añaden `useMemo` y `useRef`, además de cuatro iconos de MUI:

| Import | Uso |
| --- | --- |
| `useMemo` | Memorizar la galería plana de imágenes |
| `useRef` | Referencias al `<video>` y al botón de cierre del lightbox |
| `ZoomInIcon` | Pistas visuales de "ampliar" en la imagen principal y en la galería |
| `CloseIcon` | Botón de cierre del lightbox |
| `ChevronLeftIcon` / `ChevronRightIcon` | Navegación anterior/siguiente del lightbox |

### 2.2 Tipos y utilidades

Se definen tipos locales para dar estructura al contenido:

```ts
type RichTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}
```

- **`parseRichText(rawText)`**: transforma el texto plano de `projects.ts` en bloques de párrafo y listas.
  - Normaliza saltos de línea (`\r\n` y `\r`).
  - Una línea vacía cierra el párrafo o la lista actual.
  - Las líneas que comienzan por `🔹`, `•`, `·` o `-` (`BULLET_PATTERN`) se convierten en ítems de lista, eliminando el marcador original.
  - Las líneas consecutivas sin marcador se unen en un mismo párrafo.
  - Las listas separadas por líneas en blanco se fusionan en una sola para evitar listas fragmentadas.
- **`RichText`**: componente de presentación que renderiza los bloques como `<p>` o `<ul><li>`. Memoriza el parseo con `useMemo` y acepta una clase adicional (`className`), manteniendo siempre la clase base `project-detail-rich-text`.
- **`stripChallengeNumber(title)`**: elimina el prefijo numérico (`"1. "`, `"2. "`...) de los títulos de retos, ya que el número se muestra por separado.
- **`getChallengeDisplayTitle(title, position)`**: devuelve el índice formateado a dos dígitos (`01`, `02`...) y el título limpio.

### 2.3 Estado y galería

- El estado del lightbox cambia de `lightboxSrc: string | null` a **`lightboxIndex: number | null`**. Ahora se navega por un índice, no por una única imagen.
- Se añaden las referencias `videoRef` y `lightboxCloseRef`.
- La galería se construye con `useMemo` y se compone de:
  1. La imagen principal (`heroImage`), con caption "Vista general del proyecto".
  2. Todas las imágenes de todos los retos, en orden, con caption igual al título del reto sin numerar.

  Esto permite que el lightbox recorra **todas** las capturas del proyecto, no solo la que se ha pulsado.

### 2.4 Navegación del lightbox

Se encapsulan las acciones en funciones:

- `openLightbox(index)`: abre solo si el índice es válido.
- `closeLightbox()`: cierra el lightbox.
- `showPreviousImage()` / `showNextImage()`: navegación circular mediante módulo, de forma que desde la última imagen se pasa a la primera y viceversa.

### 2.5 Efectos

1. **Reset y título del documento**
   - Al cambiar de proyecto se reinician `isVideoPlaying` y `lightboxIndex`.
   - Se actualiza `document.title` a `"<título> | Vicente Codes"`.

2. **Comportamiento del lightbox**
   - Solo se activa cuando `lightboxIndex !== null`.
   - Guarda el elemento que tenía el foco para restaurarlo al cerrar.
   - Escucha `keydown`:
     - `Escape` cierra.
     - `ArrowLeft` / `ArrowRight` navegan y llaman a `preventDefault()`.
   - Bloquea el scroll del fondo (`document.body.style.overflow = "hidden"`).
   - Mueve el foco al botón de cierre.
   - En la limpieza elimina el listener, restaura el overflow y devuelve el foco al elemento anterior.

### 2.6 Cambios en el renderizado (JSX)

#### Cabecera

- Se añaden clases BEM: `project-detail-header__title` y `project-detail-header__subtitle` (antes el título era un `<h1>` sin clase y el subtítulo usaba `project-detail-subtitle`).
- El stack tecnológico incorpora una etiqueta "Stack tecnológico" (`project-detail-stack__label`) y un contenedor `project-detail-stack__chips`.
- Los `Chip` pasan de `color="primary"` a `variant="outlined"` con la clase `project-detail-chip`, dejando el estilo en SCSS.

#### Medio principal

- Nuevo contenedor `.project-detail-media` que unifica imagen y vídeo.
- **Vídeo**:
  - Envuelto en un `<figure>` con `<figcaption>`.
  - Se añade `ref={videoRef}`, `playsInline` y el wrapper con estado `is-playing` para atenuar el degradado mientras se reproduce.
  - El botón de play ya no busca el vídeo con `previousElementSibling`; llama directamente a `videoRef.current?.play()` con captura de errores.
  - El overlay incluye icono y texto "Reproducir recorrido".
- **Imagen principal** (cuando no hay vídeo):
  - Sustituye el `<img>` suelto por un `<button>` con clase `project-detail-media-button`, lo que la hace accesible por teclado y clicable.
  - Abre el lightbox en el índice `0`.
  - Se añade la pista visual "Ampliar" con `ZoomInIcon`.
  - Incluye `<figcaption>` "Vista general del proyecto".
  - Usa `loading="eager"` y `decoding="async"`.

#### Secciones de contenido

- La descripción principal deja de ser un `<p>` con clase y pasa a ser una sección "Sobre el proyecto" (`project-detail-overview`) con `RichText`.
- Todas las secciones usan:
  - `<section>` con `aria-labelledby`.
  - `<h2 class="project-detail-section__title">` con `id` único.
  - Contenido renderizado mediante `RichText`.
- Secciones afectadas: descripción, rol, retos, resultado y colaboradores.

#### Retos técnicos

- Cabecera con contador: `"{n} retos"` (`project-detail-challenges__count`).
- Cada reto se renderiza como `<article class="project-detail-challenge">` dentro de `project-detail-challenges__list`.
- Se muestra un índice visual (`01`, `02`...) y el título sin numeración duplicada.
- La descripción usa `RichText` (soporta párrafos y listas).
- Las imágenes del reto pasan de `<img>` con `onClick` a **botones** `project-detail-gallery-item`, accesibles por teclado.
- La galería alterna `is-single` / `is-grid` según el número de imágenes.
- Al pulsar una imagen se busca su índice en la galería global por `src` + `alt` y se abre el lightbox en esa posición.
- Cada imagen lleva `loading="lazy"`, `decoding="async"` y un overlay con icono de zoom.

#### Botón de repositorio

- Se envuelve en `.project-detail-actions` para gestionar el espaciado desde CSS.

#### Lightbox

El overlay se convierte en un diálogo accesible:

- `role="dialog"`, `aria-modal="true"` y `aria-label="Galería de imágenes del proyecto"`.
- Botón de cierre con `aria-label`, foco inicial y `stopPropagation()`.
- Botones anterior/siguiente solo si hay más de una imagen, con `aria-label` y navegación circular.
- `<figure>` que detiene la propagación del click para que no cierre el lightbox.
- `<figcaption>` con caption contextual y contador `"n / total"` con `font-variant-numeric` desde CSS.
- Click en el fondo cierra el lightbox.

### 2.7 Accesibilidad y UX

- Controles reales (`button`) en lugar de imágenes clicables.
- Etiquetas `aria-label` descriptivas en todos los controles.
- Navegación completa por teclado dentro del lightbox y restauración del foco.
- Bloqueo del scroll de fondo.
- Imágenes con `alt` contextual generado a partir del título del reto.
- Uso de `figcaption` para asociar captions a las figuras.
- `aria-hidden` en elementos decorativos (iconos, índices y overlays).

---

## 3. `src/assets/styles/ProjectDetail.scss`

El fichero se reescribe por completo (de ~425 a ~1063 líneas) con una estructura modular, tokens de diseño y soporte de tema claro/oscuro. Todo el estilo queda anidado bajo `.project-detail-container`.

### 3.1 Tokens de diseño

Se definen variables CSS locales:

- Superficies: `--pd-surface`, `--pd-surface-hover`, `--pd-surface-strong`.
- Bordes: `--pd-border`, `--pd-border-strong`.
- Texto: `--pd-text`, `--pd-text-muted`, `--pd-text-subtle`.
- Acento: `--pd-accent` (`#2ec5ca`), `--pd-accent-strong` (`#2496ed`), `--pd-accent-soft`, `--pd-accent-border`.
- Sombras: `--pd-shadow-soft`, `--pd-shadow`.
- Radios: `--pd-radius-sm`, `--pd-radius-md`, `--pd-radius-lg`.
- Transición unificada: `--pd-transition`.

### 3.2 Tema claro

El bloque `.light-mode &` redefine los tokens para fondo claro (superficies blancas, texto oscuro y acentos `#0b7a80` / `#1570ef`), incluyendo los degradados de fondo. Esto permite que la vista responda al modo claro sin duplicar reglas.

### 3.3 Layout

- `display: flex` en columna, `width: 100%`, `max-width: 1020px`, centrado con `margin: 0 auto`.
- Padding vertical y horizontal con `clamp()` para escalado fluido.
- `box-sizing: border-box`.
- Fondo con dos degradados radiales suaves usando los tokens de acento.
- Tipografía base `"Lato", "Segoe UI", ...`.

### 3.4 Botones

- `.back-button.MuiButton-root` y `.repo-button.MuiButton-root` comparten lógica (radio, tipografía, icono, hover con elevación y `:focus-visible`).
- Se especifica `.MuiButton-root` para ganar especificidad sobre los estilos de MUI.
- Se estilizan `.MuiButton-startIcon` y los `svg` internos.

### 3.5 Cabecera

- Título con `clamp(2.5rem, 6vw, 4.25rem)`, peso 800, `letter-spacing` negativo y `text-wrap: balance`.
- Fechas en mayúsculas con color atenuado.
- Subtítulo limitado a `68ch` con `text-wrap: pretty`.

### 3.6 Stack tecnológico

- Etiqueta en mayúsculas con línea decorativa (`::before`) y chips en fila con `flex-wrap`.
- Chips con borde, fondo translúcido, radio completo y hover con acento.

### 3.7 Medio principal (imagen)

- `.project-detail-media-button`: botón de bloque a ancho completo, borde, radio grande, sombra y `cursor: zoom-in`.
- La imagen escala ligeramente (`scale(1.015)`) al hacer hover.
- La pista "Ampliar" aparece en hover o `:focus-visible` con transición de opacidad y desplazamiento.
- Caption con tamaño y color atenuados.

### 3.8 Vídeo

- Wrapper con borde, radio, fondo negro y sombra.
- Degradado superpuesto (`::before`) que desaparece con `.is-playing`.
- Overlay centrado con `pointer-events: none`, reactivando `pointer-events` solo en el botón.
- Botón de play circular con degradado azul/turquesa, borde, sombra doble y animación de pulso (`::after`).
- Sombra más intensa y `scale` en hover; outline blanco en `:focus-visible`.

### 3.9 Secciones y texto enriquecido

- Secciones con separación fluida mediante `clamp()`.
- Títulos con barra vertical degradada (`::before`).
- `.project-detail-rich-text`:
  - Ancho máximo de lectura `72ch` y `line-height: 1.8`.
  - Párrafos con márgenes consistentes y sin margen en el último.
  - Listas sin viñeta nativa (`list-style: none`) y con viñeta circular propia (`li::before`) más halo suave.
  - Espaciado específico para listas al inicio/final.

### 3.10 Retos técnicos

- Cabecera flexible con contador en píldora.
- Tarjetas (`project-detail-challenge`) con borde, radio, fondo translúcido y hover con elevación suave.
- Índice numérico en caja destacada con acento.
- Título con `clamp()` y jerarquía clara.
- Galería interna en grid: una columna (`is-single`) o dos columnas (`is-grid`) con `minmax(0, 1fr)` para evitar desbordes.
- Elementos de galería como botones con radio, borde y overlay de zoom en hover/focus.

### 3.11 Resultado y colaboradores

- El bloque de resultado destaca con borde izquierdo de acento, degradado de fondo y sombra.
- Colaboradores usa una tarjeta de superficie simple.
- Ambos reutilizan los títulos de sección.

### 3.12 Acciones

- `.project-detail-actions` agrupa los botones con `flex-wrap`, `gap` y margen superior.

### 3.13 Lightbox

- Overlay fijo a pantalla completa con `z-index: 1300`, fondo oscuro, `backdrop-filter: blur(14px)` y animación de fade.
- `display: grid` + `place-items: center` para centrar el contenido.
- Figura limitada a `min(1120px, 92vw)` y `88vh`.
- Imagen con `object-fit: contain`, borde, radio, sombra profunda y animación de zoom suave.
- Caption y contador en una fila flexible.
- Botones de cierre y navegación circulares, fijos, con `backdrop-filter` y estados hover/focus.
- Navegación lateral centrada verticalmente con `translateY(-50%)`.

### 3.14 Animaciones

Se definen tres `@keyframes`:

- `project-detail-play-pulse`: pulso del botón de reproducción.
- `project-detail-lightbox-fade-in`: aparición del overlay.
- `project-detail-lightbox-zoom-in`: entrada de la imagen ampliada.

### 3.15 Responsive

- **`max-width: 900px`**: reduce el padding superior y pasa la galería de retos a una columna.
- **`max-width: 700px`**:
  - Contenedor al 100% con padding lateral del 5%.
  - Títulos y subtítulos más pequeños.
  - Botones, radios, sombras y paddings reducidos.
  - Cabecera de retos en columna.
  - Lightbox con menos padding, imagen a `72vh` y controles de 40 px.
- **`max-width: 480px`**:
  - La etiqueta del stack ocupa toda la fila.
  - Texto del overlay de vídeo más pequeño.
  - Figura del lightbox a `94vw` e imagen a `68vh`.

### 3.16 Preferencias y dispositivos táctiles

- **`@media (hover: none)`**: muestra permanentemente las pistas de zoom y los overlays que en escritorio dependen del hover.
- **`@media (prefers-reduced-motion: reduce)`**: desactiva animaciones y transiciones de botones, imágenes, chips y lightbox.

---

## 4. Resumen de clases eliminadas o renombradas

| Antes | Ahora |
| --- | --- |
| `project-detail-subtitle` | `project-detail-header__subtitle` |
| `project-detail-hero-image` | `project-detail-media-button` (con `<img>` interno) |
| `project-detail-zoomable` | `project-detail-media-button` / `project-detail-gallery-item` |
| `project-detail-description` | `project-detail-rich-text` dentro de `project-detail-overview` |
| `project-detail-section-text` | `project-detail-rich-text` |
| `project-detail-section-title` | `project-detail-section__title` |
| `project-detail-section-subtitle` | `project-detail-challenge__title` |
| `project-detail-sections` | `project-detail-challenges__list` |
| `project-detail-section-images.single/grid` | `project-detail-challenge__gallery.is-single/is-grid` |
| `project-detail-lightbox-image` | `project-detail-lightbox__image` |

---

## 5. Cómo probar los cambios

1. Arrancar la aplicación:

   ```bash
   npm start
   ```

2. Abrir un proyecto desde la sección "Projects", por ejemplo `/project/custom-camis`.
3. Comprobar:
   - Cabecera, fechas, subtítulo y chips del stack.
   - Proyecto con vídeo: overlay, botón de play y desaparición del degradado al reproducir.
   - Proyecto sin vídeo: clic en la imagen principal y pista "Ampliar".
   - Secciones con párrafos y listas correctamente formateados.
   - Tarjetas de retos con numeración y galerías de una o dos columnas.
   - Apertura del lightbox desde cualquier imagen.
   - Navegación con flechas del teclado, cierre con `Escape` y clic en el fondo.
   - Contador de imágenes y caption contextual.
   - Restauración del foco y bloqueo del scroll mientras el lightbox está abierto.
   - Comportamiento responsive en 900, 700 y 480 px.
   - Modo claro y `prefers-reduced-motion`.

---

## 6. Conclusión

La implementación transforma la vista de detalle en una página editorial completa, semántica y accesible, con un sistema de estilos basado en tokens y tema claro/oscuro. Los principales hitos son el parser de texto enriquecido, la galería unificada con lightbox navegable, las tarjetas de retos con imágenes accesibles y una hoja SCSS reestructurada con responsive y preferencias de movimiento.
