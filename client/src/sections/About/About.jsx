import Section from '../../components/ui/Section/Section';
import { ABOUT_IMAGES } from '../../data/gallery';
import styles from './About.module.css';

export default function About() {
  return (
    <Section id="nosotros" theme="dark" eyebrow="Un bellísimo escenario natural" title="Luces Casas de Montaña">
      <div className={styles.grid}>
        <div className={styles.text}>
          <p>
            Luces Casas de Montaña se encuentra en un escenario natural que invita a compartir la armonía del
            lugar, desconectarse de la rutina y el estrés y disfrutar de la naturaleza en una estadía tranquila y
            acogedora, junto a atardeceres fascinantes.
          </p>
          <p>
            Villa del Dique brinda al turista variadas posibilidades recreativas para disfrutar durante todo el año.
            El paisaje invita a desarrollar actividades al aire libre como trekking, pesca, windsurf, natación,
            excursiones todo terreno, buceo y parapente.
          </p>
        </div>

        <div className={styles.images}>
          {ABOUT_IMAGES.map(({ src, alt }) => (
            <img key={alt} src={src} alt={alt} loading="lazy" />
          ))}
        </div>
      </div>
    </Section>
  );
}
