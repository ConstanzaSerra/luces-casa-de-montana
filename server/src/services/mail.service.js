import nodemailer from 'nodemailer';
import { config, isSmtpConfigured } from '../config/env.js';
import { buildContactEmail } from '../../../shared/contact/emailTemplate.js';

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    })
  : null;

/** Envía la consulta por mail. Sin SMTP configurado, la imprime en consola. */
export async function sendContactEmail(contact) {
  const email = buildContactEmail(contact);

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
