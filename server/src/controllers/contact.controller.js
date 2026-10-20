import { isSpam, validateContact } from '../validators/contact.validator.js';
import { sendContactEmail } from '../services/mail.service.js';

const SUCCESS_MESSAGE = '¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.';

export async function createContact(req, res, next) {
  try {
    // A los bots les respondemos "ok" para no darles pistas, pero no enviamos nada.
    if (isSpam(req.body)) return res.status(200).json({ message: SUCCESS_MESSAGE });

    const { data, errors } = validateContact(req.body);
    if (errors) {
      return res.status(400).json({ error: 'Revisá los datos del formulario.', fields: errors });
    }

    await sendContactEmail(data);
    return res.status(201).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
}
