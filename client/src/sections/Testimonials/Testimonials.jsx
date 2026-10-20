import { Star } from 'lucide-react';
import Section from '../../components/ui/Section/Section';
import { TESTIMONIALS } from '../../data/testimonials';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <Section id="testimonios" theme="dark" title="Testimonios de clientes">
      <div className={styles.grid}>
        {TESTIMONIALS.map(({ author, date, rating, text }) => (
          <figure key={author} className={styles.card}>
            <div className={styles.stars} aria-label={`${rating} de 5 estrellas`}>
              {Array.from({ length: rating }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <blockquote>“{text}”</blockquote>
            <figcaption>
              <span className={styles.avatar} aria-hidden="true">
                {author[0]}
              </span>
              <span>
                <strong>{author}</strong>
                <small>{date}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
