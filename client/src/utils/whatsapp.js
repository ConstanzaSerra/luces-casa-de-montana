import { SITE } from '../config/site';

/** Arma un link de WhatsApp con un mensaje precargado. */
export function buildWhatsappLink(message = 'Hola! Quiero consultar disponibilidad para reservar en Luces Casas de Montaña.') {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
