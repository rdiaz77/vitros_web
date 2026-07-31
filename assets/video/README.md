# Video del hero (frontpage)

- **Formato**: MP4 (H.264), WebM (VP9) opcional como fallback más liviano.
- **Duración**: 8–15 segundos, en loop (primer y último frame deben calzar visualmente).
- **Peso**: 2–5 MB ideal, 8 MB tope — es above-the-fold y no se puede lazy-loadear.
- **Resolución**: 1920×1080 (16:9) es suficiente, no subir 4K.
- **Sin audio** (se sirve con `autoplay muted loop playsinline`).
- **Encuadre**: evitar que la acción principal quede en el tercio izquierdo del frame — ahí cae el texto del hero sobre un scrim oscuro.

## Nombres de archivo esperados
- `hero.mp4` / `hero.webm` — video de fondo del hero (desktop, ≥1024px).
- `hero-poster.jpg` — frame estático de alta calidad, se usa como `poster` del video y como fondo fijo en mobile (donde no se sirve video).

Cuando subas estos archivos avísame para cablearlos en `index.html` (el `.hero-media-slot` ya está listo, hoy está en negro sólido como placeholder).
