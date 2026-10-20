/**
 * Validación del formulario en el navegador (feedback inmediato).
 * El servidor vuelve a validar todo: nunca confiar solo en el cliente.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  message: '',
  website: '', // honeypot anti-spam: queda oculto y debe llegar vacío
};

export function validateContact(values) {
  const errors = {};

  if (values.name.trim().length < 2) errors.name = 'Ingresá tu nombre.';
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = 'Ingresá un email válido.';
  if (values.checkIn && values.checkOut && values.checkOut <= values.checkIn) {
    errors.checkOut = 'La salida tiene que ser posterior a la llegada.';
  }
  if (values.message.trim().length < 10) errors.message = 'Contanos un poco más (mínimo 10 caracteres).';

  return errors;
}
