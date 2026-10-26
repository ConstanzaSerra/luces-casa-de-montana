import { buildContactEmail } from './emailTemplate.js';

const RESEND_URL = 'https://api.resend.com/emails';
// Remitente de prueba de Resend: sirve sin dominio propio, pero solo envía a la casilla de tu cuenta.
const DEFAULT_FROM = 'Web Luces Casas de Montaña <onboarding@resend.dev>';

/**
 * Envía la consulta con la API HTTP de Resend (https://resend.com).
 * Se usa en Cloudflare, donde no se puede usar SMTP/nodemailer.
 */
export async function sendWithResend(contact, { apiKey, to, from = DEFAULT_FROM }) {
  const email = buildContactEmail(contact);

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: contact.email, ...email }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend respondió ${response.status}: ${detail}`);
  }
}
