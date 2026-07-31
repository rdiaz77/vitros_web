# Vitroscience SpA — Mockup del sitio web

Mockup estático (HTML5 + CSS3 + JavaScript ES6, sin frameworks ni CMS) del sitio corporativo de Vitroscience SpA, basado en:

- `Structura_001_1_1.pdf` — mapa del sitio.
- `PROYECTO_WEB_VITROSCIENCE_SPA_1.docx` — brief de diseño, paleta y estructura.
- `Sitio_Web_pagina_de_productos.pdf` — referencia visual de ficha de producto.
- `Paleta_de_Colores_Vitroscience_2.pdf` — paleta oficial de marca.

## Estructura de carpetas

```
vitros_web/
├── index.html                       Home
├── nosotros.html                    Nosotros
├── productos.html                   Catálogo completo (todas las categorías, tarjetas individuales por test)
├── categoria-*.html                 Una página por categoría (qc-clinica, biologia-molecular, test-rapidos, ifob, poc, control-calidad)
├── producto.html                    Ficha de producto genérica (plantilla de detalle)
├── producto-reactivos-abiertos.html Ficha de producto completa (referencia de detalle máximo)
├── clientes.html                    Portal de clientes (login/registro + preview de dashboard, mock)
├── noticias.html                    Noticias / blog
├── contacto.html                    Formulario de contacto + mapa + FAQ
├── politicas.html                   Políticas de la empresa
└── assets/
    ├── css/
    │   ├── variables.css   Tokens de marca: colores, tipografía, radios, sombras
    │   ├── base.css        Reset y fundamentos tipográficos
    │   ├── components.css  Botones, cards, badges, formularios, tablas, floating buttons
    │   ├── layout.css       Header, mega menú, footer
    │   ├── animations.css   Scroll reveal, parallax, marquee, microanimaciones
    │   └── pages.css        Estilos específicos de cada sección/página
    ├── js/
    │   └── main.js          Menú móvil, mega menú, scroll reveal, tabs, galería, formularios mock, correo ofuscado
    ├── img/
    │   ├── products/        Fotos reales de producto (ver README dentro)
    │   └── icons/            Logos de marcas / iconografía raster (ver README dentro)
    ├── video/                Video del hero + poster (ver README dentro — specs de peso/duración/formato)
    └── docs/                 Fichas técnicas, certificados, política de la empresa en PDF (ver README dentro)
```

Cada página es HTML plano y autocontenido (sin motor de plantillas), pensado para abrirse directamente en el navegador o servirse desde cualquier hosting estático — **no hay build step**, no hay `npm install`, no hay dependencias.

## Cómo publicar el sitio

Al ser 100% estático y con solo rutas relativas, subirlo es literalmente copiar la carpeta completa a donde vaya a vivir:

- **Hosting tradicional (cPanel / FTP)**: sube todo el contenido de esta carpeta (no la carpeta en sí, su *contenido*) a `public_html` (o la subcarpeta correspondiente) vía FTP o el Administrador de Archivos de cPanel.
- **Netlify / Vercel**: arrastra la carpeta al deploy manual, o conecta este repo — build command: ninguno, publish directory: `/` (raíz).
- **GitHub Pages**: activa Pages sobre esta rama, carpeta raíz.

No hay variables de entorno ni configuración de servidor que ajustar. Antes de publicar en producción, reemplaza los placeholders listados abajo.

## Paleta de colores (`assets/css/variables.css`)

| Color | Hex | Uso |
|---|---|---|
| Prussian Blue | `#023047` | Primario |
| Blue Green | `#219EBC` | Secundario |
| Light Cornflower Blue | `#8ECAE6` | Apoyo |
| Soft Leaf Green | `#90BE6D` | Complementario / Acento |
| Blanco | `#FFFFFF` | Fondo principal |

## Notas del mockup / pendientes antes de producción

- Los formularios (contacto, cotización, login/registro, newsletter) están simulados en el cliente (`data-mock-form` en `main.js`) — no envían datos a un backend real; falta conectarlos a un servicio de envío de correo.
- Los logos de "Marcas representadas" y las imágenes de producto son placeholders vectoriales (SVG) — ver `assets/img/products/README.md` y `assets/img/icons/README.md` para specs y cómo reemplazarlos.
- El hero del home está listo para recibir el video de fondo (hoy negro sólido como placeholder) — ver `assets/video/README.md` para specs de peso/duración/formato y el manejo de la versión mobile (foto estática en vez de video).
- El teléfono de contacto y el número de WhatsApp siguen siendo de ejemplo (`+56 2 2345 6789` / `wa.me/56912345678`) — falta el dato real.
- `politicas.html` tiene un bloque placeholder a la espera del documento real de políticas de la empresa.
- Integración de backend/CMS para productos y portal de clientes sigue pendiente (fuera del alcance de este mockup estático).
- **Pendiente (no ahora): edición de contenido sin código.** Hoy todo el contenido vive directo en el HTML — cualquier cambio de texto/producto pasa por editar código. Cuando se retome, evaluar entre (a) mover la data a archivos JSON que el JS renderiza (liviano, se mantiene 100% estático) o (b) un CMS git-based tipo Decap CMS (da un panel de edición real, pero se aleja del "sin CMS" del brief original). Explícitamente marcado como no prioritario por ahora.
