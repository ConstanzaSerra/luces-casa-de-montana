import { useState } from 'react';
import { INITIAL_VALUES, validateContact } from './validation';
import { sendContactMessage } from './contactApi';

/**
 * Maneja el estado del formulario de contacto: valores, errores y envío.
 * status: "idle" | "sending" | "success" | "error"
 */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateContact(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('sending');
    try {
      const data = await sendContactMessage(values);
      setStatus('success');
      setServerMessage(data.message);
      setValues(INITIAL_VALUES);
    } catch (error) {
      setStatus('error');
      setServerMessage(error.message);
    }
  };

  return { values, errors, status, serverMessage, handleChange, handleSubmit };
}
