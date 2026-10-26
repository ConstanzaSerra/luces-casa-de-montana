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

server/                      → Backend para Railway (Node + Express)
  src/routes/                → define las URLs (/api/contact)
  src/controllers/           → recibe el request y arma la respuesta
  src/services/              → envío de mails por SMTP (nodemailer)
  src/middlewares/           → manejo de errores y 404
  tests/                     → tests con node:test (Express y función de Cloudflare)

functions/                   → Backend para Cloudflare Pages (un archivo por ruta)
  api/contact.js             → POST /api/contact
  api/health.js              → GET /api/health

shared/contact/              → lógica común a los dos backends
  validator.js               → valida y limpia los datos del formulario
  emailTemplate.js           → arma el mail de la consulta
  resendMailer.js            → envía el mail con la API de Resend (Cloudflare)
```

Hay **dos formas de desplegar** con el mismo código: Railway usa `server/` y Cloudflare usa `functions/`.
Las dos comparten `shared/`, así que un cambio en la validación o en el mail se hace una sola vez.

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
| Validación o texto del mail     | `shared/contact/`                         |

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

## Deploy en Cloudflare Pages (gratis)

1. Creá una cuenta en [Resend](https://resend.com) con el mail que recibe las consultas y generá una **API key**.
   Sin dominio propio, Resend solo envía a la casilla de tu cuenta (justo la que necesitamos).
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elegí este repo.
   - Production branch: `main` (o `cloudflare` mientras se prueba)
   - Build command: `npm run build`
   - Build output directory: `client/dist`
   - Root directory: vacío
3. En **Settings → Variables and Secrets** cargá `RESEND_API_KEY` (como secreto) y `CONTACT_TO`.
   Opcional: `MAIL_FROM` cuando tengas un dominio verificado en Resend.
4. Volvé a desplegar y probá el formulario.
5. Recomendado: en **Security → WAF → Rate limiting rules** limitá `/api/contact` (por ejemplo 5 pedidos cada 10 minutos por IP).
   En Railway ese límite lo hace Express; en Cloudflare se configura en el panel.

Para probar la versión de Cloudflare en tu compu: copiá `.dev.vars.example` como `.dev.vars` y corré `npm run dev:cloudflare`
(abre el sitio en http://localhost:8788).
