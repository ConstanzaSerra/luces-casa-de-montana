/**
 * Arma el contenido del mail de una consulta.
 * Lo usan tanto el servidor Express (Railway) como la función de Cloudflare.
 */
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function buildContactEmail(contact) {
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

export const SUCCESS_MESSAGE = '¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.';
