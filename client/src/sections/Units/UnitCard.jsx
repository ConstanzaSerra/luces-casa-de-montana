import { useState } from 'react';
import { BedDouble, Expand, Users } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import Lightbox from '../../components/ui/Lightbox/Lightbox';
import { useLightbox } from '../../hooks/useLightbox';
import { buildWhatsappLink } from '../../utils/whatsapp';
import styles from './UnitCard.module.css';

/** Tarjeta de un tipo de cabaña con mini galería y botón de reserva. */
export default function UnitCard({ unit }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lightbox = useLightbox();
  const activeImage = unit.images[activeIndex];
  const reserveMessage = `Hola! Quiero reservar la ${unit.name} (máx. ${unit.guests} huéspedes). ¿Qué disponibilidad tienen?`;

  return (
    <article className={styles.card}>
      <div className={styles.gallery}>
        <button
          type="button"
          className={styles.mainButton}
          onClick={() => lightbox.open(unit.name, unit.images, activeIndex)}
          aria-label={`Ampliar fotos de la ${unit.name}`}
        >
          <img className={styles.mainImage} src={activeImage.src} alt={activeImage.alt} loading="lazy" />
          <Expand className={styles.expandIcon} size={20} aria-hidden="true" />
        </button>
        <div className={styles.thumbs}>
          {unit.images.map((image, index) => (
            <button
              key={image.alt}
              className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver foto: ${image.alt}`}
              aria-pressed={index === activeIndex}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox title={lightbox.title} images={lightbox.images} startIndex={lightbox.startIndex} onClose={lightbox.close} />

      <div className={styles.body}>
        <h3>{unit.name}</h3>
        <ul className={styles.specs}>
          <li>
            <Users size={18} aria-hidden="true" /> Máx. {unit.guests} huéspedes
          </li>
          <li>
            <BedDouble size={18} aria-hidden="true" /> {unit.beds}
          </li>
        </ul>
        <p className={styles.description}>{unit.description}</p>

        <div className={styles.footer}>
          <p className={styles.price}>
            {unit.price ? (
              <>
                <strong>{unit.price}</strong> / noche
              </>
            ) : (
              'Consultá tarifa y disponibilidad'
            )}
          </p>
          <Button href={buildWhatsappLink(reserveMessage)}>Reservar</Button>
        </div>
      </div>
    </article>
  );
}
