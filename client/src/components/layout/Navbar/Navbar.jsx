import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../ui/Logo/Logo';
import Button from '../../ui/Button/Button';
import { NAV_ITEMS } from '../../../data/navigation';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { buildWhatsappLink } from '../../../utils/whatsapp';
import styles from './Navbar.module.css';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  // El navbar es transparente sobre el hero y se vuelve sólido al hacer scroll.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.navbar} ${isScrolled || isOpen ? styles.solid : ''}`}>
      <nav className={styles.inner} aria-label="Navegación principal">
        <a href="#inicio" className={styles.brand} onClick={closeMenu} aria-label="Ir al inicio">
          <Logo />
        </a>

        <button
          className={styles.toggle}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="menu-principal"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <ul id="menu-principal" className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.link} ${activeId === id ? styles.active : ''}`}
                aria-current={activeId === id ? 'true' : undefined}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
          <li className={styles.cta}>
            <Button href={buildWhatsappLink()} size="sm" onClick={closeMenu}>
              Reservar
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
