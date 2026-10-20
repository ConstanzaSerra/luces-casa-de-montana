# Luces Casas de Montaña — sitio web

Sitio one-page para promocionar las cabañas **Luces Casas de Montaña** (Villa del Dique, Calamuchita, Córdoba).
El objetivo principal (CTA) es que el visitante **reserve**: por WhatsApp o dejando una consulta en el formulario.

## Cómo correrlo

Requisitos: Node 20.6 o superior.

```bash
npm install          # instala front y back (workspaces)
npm run dev          # front en http://localhost:5173 + API en http://localhost:3001
npm test             # tests de la API
npm run build        # compila el front a client/dist
npm start            # producción: Express sirve la API y el sitio compilado en :3001
```

Para que el formulario mande mails, copiá `server/.env.example` como `server/.env` y completá los datos SMTP.
Sin SMTP, las consultas se imprimen en la consola del servidor.

## Estructura

```
client/                      → Frontend (React + Vite)
  src/config/site.js         → teléfono, mail, dirección, redes, horarios  ← cambios rápidos acá
  src/data/                  → contenido: cabañas, servicios, destinos, testimonios, menú
  src/assets/images/         → fotos
  src/styles/variables.css   → colores, tipografías y espaciados
  src/components/ui/         → piezas reutilizables (Button, Section, Logo)
  src/components/layout/     → Navbar, Footer y botón flotante de WhatsApp
  src/sections/              → una carpeta por sección de la página (Hero, About, Services, Units, …)
  src/features/contact/      → formulario: UI, hook de estado, validación y llamada a la API
  src/App.jsx                → orden de las secciones

server/                      → Backend (Node + Express)
  src/routes/                → define las URLs (/api/contact)
  src/controllers/           → recibe el request y arma la respuesta
  src/validators/            → valida y limpia los datos del formulario
  src/services/              → envío de mails (nodemailer)
  src/middlewares/           → manejo de errores y 404
  tests/                     → tests con node:test + supertest
```

## Cambios frecuentes

| Quiero cambiar…                 | Archivo                                   |
|---------------------------------|-------------------------------------------|
| Teléfono, mail, redes, horarios | `client/src/config/site.js`               |
| Cabañas (fotos, camas, precios) | `client/src/data/units.js`                |
| Servicios y comodidades         | `client/src/data/services.js`             |
| Lugares para visitar            | `client/src/data/destinations.js`         |
| Reseñas                         | `client/src/data/testimonials.js`         |
| Colores o tipografías           | `client/src/styles/variables.css`         |
| Orden o cantidad de secciones   | `client/src/App.jsx`                      |
| Mensaje de WhatsApp por defecto | `client/src/utils/whatsapp.js`            |

## Pendientes

- Fotos originales en alta resolución (las actuales están recortadas de los mockups).
- Logo original en SVG o PNG con fondo transparente (hoy es un logo tipográfico provisorio).
- Links reales de Facebook, Instagram y TikTok.
- Fotos de "Qué hacer": confirmar que se pueden usar o reemplazarlas por fotos propias/libres.
- Tarifas (opcional, campo `price` en `units.js`).

## Deploy en Railway

El repo ya incluye `railway.json`: Railway instala, compila el front (`npm run build`) y levanta Express (`npm start`),
que sirve la API y el sitio en el mismo dominio. Railway define `PORT` solo.
En **Variables** del servicio cargá `CONTACT_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` y `SMTP_PASS` (ver `server/.env.example`).
