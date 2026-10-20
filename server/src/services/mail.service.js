import nodemailer from 'nodemailer';
import { config, isSmtpConfigured } from '../config/env.js';

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    })
  : null;

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function buildEmail(contact) {
  const rows = [
    ['Nombre', contact.name],
    ['Email', contact.email],
    ['Teléfono', contact.phone || '—'],
    ['Llegada', contact.checkIn || '—'],
    ['Salida', contact.checkOut || '—'],
    ['Huéspedes', contact.guests ?? '—'],
  ];

  return {
    subject: `Nueva consulta web de ${contact.name}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${contact.message}`,
    html: `
      <h2>Nueva consulta desde la web</h2>
      <table>${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>
      <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>`,
  };
}

/** Envía la consulta por mail. Sin SMTP configurado, la imprime en consola. */
export async function sendContactEmail(contact) {
  const email = buildEmail(contact);

  if (!transporter) {
    console.info('[mail] SMTP no configurado. Consulta recibida:\n', email.text);
    return;
  }

  await transporter.sendMail({
    from: `"Web Luces Casas de Montaña" <${config.smtp.user}>`,
    to: config.contactTo,
    replyTo: contact.email,
    ...email,
  });
}
