import { MessageCircle } from 'lucide-react';
import { buildWhatsappLink } from '../../../utils/whatsapp';
import styles from './WhatsappFab.module.css';

// Botón flotante de WhatsApp: el CTA de reserva siempre visible.
export default function WhatsappFab() {
  return (
    <a
      href={buildWhatsappLink()}
      className={styles.fab}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
    >
      <MessageCircle size={28} aria-hidden="true" />
      <span className={styles.label}>Reservá por WhatsApp</span>
    </a>
  );
}
