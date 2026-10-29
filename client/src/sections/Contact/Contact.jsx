import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import Section from '../../components/ui/Section/Section';
import Button from '../../components/ui/Button/Button';
import SocialLinks from '../../components/ui/SocialLinks/SocialLinks';
import ContactForm from '../../features/contact/ContactForm';
import { SITE } from '../../config/site';
import { buildWhatsappLink } from '../../utils/whatsapp';
import backgroundImage from '../../assets/images/contacto-lago.jpg';
import styles from './Contact.module.css';

const CONTACT_ITEMS = [
  { icon: MapPin, label: SITE.address, href: SITE.mapsUrl },
  { icon: MessageCircle, label: `WhatsApp ${SITE.phoneDisplay}`, href: buildWhatsappLink() },
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: SITE.businessHours },
];

export default function Contact() {
  return (
    <div id="contacto">
      <div className={styles.banner} style={{ '--contact-image': `url(${backgroundImage})` }}>
        <p className={styles.eyebrow}>¿Por qué reservar a través de la web?</p>
        <h2 className={styles.title}>Reservá directo y obtené la mejor tarifa</h2>
        <p>Reservar por la web garantiza la mejor tarifa de nuestras 4 unidades.</p>
        <p>Atención permanente por la web, Instagram, Facebook, TikTok y WhatsApp Business.</p>
        <Button href={buildWhatsappLink()} size="lg">
          Reservar por WhatsApp
        </Button>
      </div>

      <Section theme="dark">
        <div className={styles.grid}>
          <div className={styles.info}>
            <h3>Contacto</h3>
            <ul className={styles.items}>
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Icon size={20} aria-hidden="true" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
            <SocialLinks className={styles.social} />
          </div>
          <ContactForm />
        </div>
      </Section>
    </div>
  );
}
