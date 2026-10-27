import { Send } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import FormField from './FormField';
import { useContactForm } from './useContactForm';
import styles from './ContactForm.module.css';

const today = new Date().toISOString().split('T')[0];

export default function ContactForm() {
  const { values, errors, status, serverMessage, handleChange, handleSubmit } = useContactForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.title}>Consultá disponibilidad</h3>

      <div className={styles.grid}>
        <FormField label="Nombre *" name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" />
        <FormField label="Email *" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" />
        <FormField label="Teléfono" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
        <FormField label="Huéspedes" name="guests" as="select" value={values.guests} onChange={handleChange}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </FormField>
        <FormField label="Llegada" name="checkIn" type="date" min={today} value={values.checkIn} onChange={handleChange} />
        <FormField label="Salida" name="checkOut" type="date" min={values.checkIn || today} value={values.checkOut} onChange={handleChange} error={errors.checkOut} />
        <FormField
          label="Mensaje (opcional)"
          name="message"
          as="textarea"
          rows={4}
          className={styles.full}
          value={values.message}
          onChange={handleChange}
          error={errors.message}
        />
      </div>

      {/* Honeypot: invisible para personas, los bots suelen completarlo. */}
      <input type="text" name="website" value={values.website} onChange={handleChange} className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <Button type="submit" size="lg" disabled={status === 'sending'}>
        <Send size={18} aria-hidden="true" />
        {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
      </Button>

      <p role="status" className={`${styles.feedback} ${styles[status] || ''}`}>
        {(status === 'success' || status === 'error') && serverMessage}
      </p>
    </form>
  );
}
