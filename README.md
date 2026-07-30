# Vitroscience SpA — Mockup del sitio web

Mockup estático (HTML5 + CSS3 + JavaScript ES6, sin frameworks ni CMS) del sitio corporativo de Vitroscience SpA, basado en:

- `Structura_001_1_1.pdf` — mapa del sitio.
- `PROYECTO_WEB_VITROSCIENCE_SPA_1.docx` — brief de diseño, paleta y estructura.
- `Sitio_Web_pagina_de_productos.pdf` — referencia visual de ficha de producto.
- `Paleta_de_Colores_Vitroscience_2.pdf` — paleta oficial de marca.

## Estructura de carpetas

```
vitros_web/
├── index.html          Home
├── nosotros.html        Nosotros
├── productos.html        Catálogo por categorías (QC Clínica, Biología Molecular, Test Rápidos, POC, Control de Calidad)
├── producto.html         Ficha de producto (plantilla de detalle)
├── clientes.html         Portal de clientes (login/registro + preview de dashboard, mock)
├── noticias.html         Noticias / blog
├── contacto.html         Formulario de contacto + mapa + FAQ
└── assets/
    ├── css/
    │   ├── variables.css   Tokens de marca: colores, tipografía, radios, sombras
    │   ├── base.css        Reset y fundamentos tipográficos
    │   ├── components.css  Botones, cards, badges, formularios, tablas, floating buttons
    │   ├── layout.css       Header, mega menú, footer
    │   ├── animations.css   Scroll reveal, parallax, marquee, microanimaciones
    │   └── pages.css        Estilos específicos de cada sección/página
    └── js/
        └── main.js          Menú móvil, mega menú, scroll reveal, tabs, galería, formularios mock
```

Cada página es HTML plano y autocontenido (sin motor de plantillas), pensado para abrirse directamente en el navegador o servirse desde cualquier hosting estático.

## Paleta de colores (`assets/css/variables.css`)

| Color | Hex | Uso |
|---|---|---|
| Prussian Blue | `#023047` | Primario |
| Blue Green | `#219EBC` | Secundario |
| Light Cornflower Blue | `#8ECAE6` | Apoyo |
| Soft Leaf Green | `#90BE6D` | Complementario |
| Sunshine Yellow | `#FFB703` | Acento |
| Blanco | `#FFFFFF` | Fondo principal |

## Notas del mockup

- Los formularios (contacto, cotización, login/registro, newsletter) están simulados en el cliente (`data-mock-form` en `main.js`) — no envían datos a un backend real.
- Los logos de "Marcas representadas" y las imágenes de producto son placeholders vectoriales (SVG) — deben reemplazarse por assets reales antes de publicar.
- El botón de WhatsApp flotante y el mapa embebido usan datos de ejemplo (teléfono, dirección) que deben actualizarse con la información real de la empresa.
- Pendiente para producción: integración de backend/CMS para productos y portal de clientes, conexión de formularios a un servicio de envío de correo, imágenes de producto reales, y contenido definitivo de Nosotros/Noticias.
