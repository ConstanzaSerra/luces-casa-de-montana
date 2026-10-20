import Section from '../../components/ui/Section/Section';
import { UNITS } from '../../data/units';
import { GALLERY } from '../../data/gallery';
import UnitCard from './UnitCard';
import styles from './Units.module.css';

export default function Units() {
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
        {GALLERY.map(({ src, alt }) => (
          <img key={alt} src={src} alt={alt} loading="lazy" />
        ))}
      </div>
    </Section>
  );
}
