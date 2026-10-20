import styles from './Section.module.css';

/**
 * Envoltorio común de cada sección: id para el navbar, tema de color y título.
 * theme: "light" | "dark" | "mist"
 */
export default function Section({ id, theme = 'light', eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`${styles.section} ${styles[theme]} ${className}`}>
      <div className={styles.container}>
        {(eyebrow || title || intro) && (
          <header className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {intro && <p className={styles.intro}>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
