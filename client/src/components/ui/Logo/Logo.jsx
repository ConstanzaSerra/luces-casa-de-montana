import styles from './Logo.module.css';

// Logo tipográfico provisorio. Cuando tengamos el logo original (SVG/PNG), se reemplaza acá.
export default function Logo({ size = 'md' }) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.script}>Luces</span>
      <span className={styles.caption}>Casas de Montaña</span>
    </span>
  );
}
