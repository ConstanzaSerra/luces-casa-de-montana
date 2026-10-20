import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createContact } from '../controllers/contact.controller.js';

const router = Router();

// Máximo 5 consultas cada 15 minutos por IP, para frenar abusos.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Recibimos varias consultas seguidas. Probá de nuevo en unos minutos.' },
});

router.post('/', contactLimiter, createContact);

export default router;
