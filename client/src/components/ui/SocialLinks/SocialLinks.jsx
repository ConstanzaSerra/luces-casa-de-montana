import { SOCIAL_LINKS } from '../../../data/socialLinks';
import styles from './SocialLinks.module.css';

/** Lista de íconos de redes sociales (se usa en el pie y en Contacto). */
export default function SocialLinks({ className = '' }) {
  if (SOCIAL_LINKS.length === 0) return null;

  return (
    <ul className={`${styles.social} ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon size={20} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
