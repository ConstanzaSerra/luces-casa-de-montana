/**
 * Cloudflare Pages Function: POST /api/contact
 * Hace lo mismo que server/src/controllers/contact.controller.js, pero corre en Cloudflare.
 * Variables (Cloudflare → Settings → Variables): RESEND_API_KEY, CONTACT_TO y, opcional, MAIL_FROM.
 */
import { isSpam, validateContact } from '../../shared/contact/validator.js';
import { SUCCESS_MESSAGE } from '../../shared/contact/emailTemplate.js';
import { sendWithResend } from '../../shared/contact/resendMailer.js';

const MAX_BODY_BYTES = 20_000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

async function readJson(request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function onRequestPost({ request, env }) {
  const body = await readJson(request);
  if (!body) return json({ error: 'Revisá los datos del formulario.' }, 400);

  // A los bots les respondemos "ok" para no darles pistas, pero no enviamos nada.
  if (isSpam(body)) return json({ message: SUCCESS_MESSAGE });

  const { data, errors } = validateContact(body);
  if (errors) return json({ error: 'Revisá los datos del formulario.', fields: errors }, 400);

  if (!env.RESEND_API_KEY) {
    console.info('[mail] RESEND_API_KEY no configurada. Consulta recibida:', data);
    return json({ message: SUCCESS_MESSAGE }, 201);
  }

  try {
    await sendWithResend(data, {
      apiKey: env.RESEND_API_KEY,
      to: env.CONTACT_TO || 'lucesvilladeldique@gmail.com',
      from: env.MAIL_FROM || undefined,
    });
    return json({ message: SUCCESS_MESSAGE }, 201);
  } catch (error) {
    console.error('[mail]', error);
    return json({ error: 'No pudimos enviar tu consulta. Probá de nuevo más tarde.' }, 502);
  }
}
