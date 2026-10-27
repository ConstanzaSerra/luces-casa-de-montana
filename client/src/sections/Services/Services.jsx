import { Images, Info } from 'lucide-react';
import Section from '../../components/ui/Section/Section';
import Lightbox from '../../components/ui/Lightbox/Lightbox';
import { useLightbox } from '../../hooks/useLightbox';
import { AMENITIES, HIGHLIGHTS, NOT_INCLUDED } from '../../data/services';
import styles from './Services.module.css';

export default function Services() {
  const lightbox = useLightbox();

  return (
    <Section id="servicios" theme="mist" title="Servicios">
      <div className={styles.highlights}>
        {HIGHLIGHTS.map(({ title, description, images }) => (
          <article key={title} className={styles.card}>
            <div className={styles.cover}>
              <img src={images[0].src} alt="" loading="lazy" />
              <span className={styles.badge}>
                <Images size={16} aria-hidden="true" /> {images.length} fotos
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3>
                {/* El botón cubre toda la tarjeta (ver .openGallery en el CSS). */}
                <button type="button" className={styles.openGallery} onClick={() => lightbox.open(title, images)}>
                  {title}
                </button>
              </h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>

      <Lightbox
        title={lightbox.title}
        images={lightbox.images}
        startIndex={lightbox.startIndex}
        onClose={lightbox.close}
      />

      <ul className={styles.amenities}>
        {AMENITIES.map(({ icon: Icon, label }) => (
          <li key={label}>
            <span className={styles.icon}>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>

      <aside className={styles.notice}>
        <Info size={22} aria-hidden="true" />
        <div>
          <h3>Para tener en cuenta</h3>
          <ul>
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </Section>
  );
}
