import Section from '../../components/ui/Section/Section';
import { DESTINATIONS } from '../../data/destinations';
import styles from './Destinations.module.css';

export default function Destinations() {
  return (
    <Section id="que-hacer" theme="mist" eyebrow="Escapadas cerca" title="Qué hacer en el Valle de Calamuchita">
      <div className={styles.grid}>
        {DESTINATIONS.map(({ name, description, image }) => (
          <article key={name} className={styles.card}>
            <img src={image} alt={name} loading="lazy" />
            <div className={styles.body}>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
