import styles from './ContactForm.module.css';

/** Campo de formulario con label y mensaje de error accesibles. */
export default function FormField({ label, name, error, as = 'input', className = '', ...props }) {
  const Control = as;
  const errorId = `${name}-error`;

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <Control
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}
