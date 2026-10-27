/**
 * Valida y normaliza los datos del formulario de contacto.
 * Devuelve { data } si todo está bien, o { errors } con un mensaje por campo.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const clean = (value, maxLength) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');

export function validateContact(body = {}) {
  const data = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 30),
    checkIn: clean(body.checkIn, 10),
    checkOut: clean(body.checkOut, 10),
    guests: Number(body.guests) || null,
    message: clean(body.message, 2000),
  };
  const errors = {};

  if (data.name.length < 2) errors.name = 'El nombre es obligatorio.';
  if (!EMAIL_REGEX.test(data.email)) errors.email = 'El email no es válido.';
  if (data.checkIn && !DATE_REGEX.test(data.checkIn)) errors.checkIn = 'Fecha de llegada inválida.';
  if (data.checkOut && !DATE_REGEX.test(data.checkOut)) errors.checkOut = 'Fecha de salida inválida.';
  if (data.checkIn && data.checkOut && data.checkOut <= data.checkIn) {
    errors.checkOut = 'La salida debe ser posterior a la llegada.';
  }
  if (data.guests !== null && (data.guests < 1 || data.guests > 4)) errors.guests = 'Entre 1 y 4 huéspedes.';

  return Object.keys(errors).length > 0 ? { errors } : { data };
}

/** Honeypot: si el campo oculto "website" viene completo, es un bot. */
export const isSpam = (body = {}) => Boolean(body.website);
