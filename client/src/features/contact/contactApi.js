/** Envía la consulta al backend. Lanza un Error con el mensaje del servidor si falla. */
export async function sendContactMessage(payload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.');
  }

  return data;
}
