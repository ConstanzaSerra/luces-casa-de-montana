import { CalendarCheck, Clock, Home, Waves } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import Logo from '../../components/ui/Logo/Logo';
import { SITE } from '../../config/site';
import { buildWhatsappLink } from '../../utils/whatsapp';
import heroImage from '../../assets/images/hero-lago.jpg';
import styles from './Hero.module.css';

const QUICK_FACTS = [
  { icon: Home, label: '4 cabañas modernas' },
  { icon: Waves, label: 'Pileta con vista al valle' },
  { icon: Clock, label: `Check-in ${SITE.checkIn} · Check-out ${SITE.checkOut}` },
];

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} style={{ '--hero-image': `url(${heroImage})` }}>
      <div className={styles.content}>
        <p className={styles.location}>{SITE.location}</p>
        <h1 className={styles.title}>
          <Logo size="lg" />
          <span className="visually-hidden">{SITE.name}</span>
        </h1>
        <p className={styles.tagline}>{SITE.tagline}</p>
        <p className={styles.script}>Vistas impresionantes.</p>

        <div className={styles.actions}>
          <Button href={buildWhatsappLink()} size="lg">
            <CalendarCheck size={20} aria-hidden="true" />
            Reservá tu estadía
          </Button>
          <Button href="#cabanas" variant="outline" size="lg">
            Ver cabañas
          </Button>
        </div>
      </div>

      <ul className={styles.facts}>
        {QUICK_FACTS.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon size={20} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
