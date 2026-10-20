import { Info } from 'lucide-react';
import Section from '../../components/ui/Section/Section';
import { AMENITIES, HIGHLIGHTS, NOT_INCLUDED } from '../../data/services';
import styles from './Services.module.css';

export default function Services() {
  return (
    <Section id="servicios" theme="mist" title="Servicios">
      <div className={styles.highlights}>
        {HIGHLIGHTS.map(({ title, description, image }) => (
          <article key={title} className={styles.card}>
            <img src={image} alt="" loading="lazy" />
            <div className={styles.cardBody}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>

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
