import { Facebook, Instagram, Music2 } from 'lucide-react';
import Logo from '../../ui/Logo/Logo';
import { SITE } from '../../../config/site';
import { NAV_ITEMS } from '../../../data/navigation';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { href: SITE.social.facebook, label: 'Facebook', icon: Facebook },
  { href: SITE.social.instagram, label: 'Instagram', icon: Instagram },
  { href: SITE.social.tiktok, label: 'TikTok', icon: Music2 },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p>{SITE.location}</p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <ul className={styles.links}>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.social}>
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
