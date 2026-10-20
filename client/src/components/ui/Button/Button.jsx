import styles from './Button.module.css';

/**
 * Botón reutilizable. Si recibe `href` se renderiza como link.
 * Variantes: primary (CTA de reserva), outline, ghost.
 */
export default function Button({ href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = [styles.button, styles[variant], styles[size], className].join(' ');

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
