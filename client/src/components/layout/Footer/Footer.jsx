import Logo from '../../ui/Logo/Logo';
import SocialLinks from '../../ui/SocialLinks/SocialLinks';
import { SITE } from '../../../config/site';
import { NAV_ITEMS } from '../../../data/navigation';
import styles from './Footer.module.css';

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

        <SocialLinks />
      </div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
