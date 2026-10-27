import Section from '../../components/ui/Section/Section';
import Lightbox from '../../components/ui/Lightbox/Lightbox';
import { useLightbox } from '../../hooks/useLightbox';
import { UNITS } from '../../data/units';
import { GALLERY } from '../../data/gallery';
import UnitCard from './UnitCard';
import styles from './Units.module.css';

export default function Units() {
  const lightbox = useLightbox();

  return (
    <Section
      id="cabanas"
      theme="light"
      eyebrow="Comodidades"
      title="Nuestras cabañas"
      intro="Cuatro unidades modernas y totalmente equipadas, con cochera techada y acceso a la pileta. Reservando por la web tenés la mejor tarifa."
    >
      <div className={styles.list}>
        {UNITS.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>

      <div className={styles.gallery}>
        {GALLERY.map(({ src, alt }, index) => (
          <button
            key={alt}
            type="button"
            onClick={() => lightbox.open('Luces Casas de Montaña', GALLERY, index)}
            aria-label={`Ampliar: ${alt}`}
          >
            <img src={src} alt={alt} loading="lazy" />
          </button>
        ))}
      </div>

      <Lightbox title={lightbox.title} images={lightbox.images} startIndex={lightbox.startIndex} onClose={lightbox.close} />
    </Section>
  );
}
