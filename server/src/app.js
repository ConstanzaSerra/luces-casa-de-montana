import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import contactRoutes from './routes/contact.routes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_DIST = path.resolve(__dirname, '../../client/dist');

/** Crea la app de Express (separada de index.js para poder testearla). */
export function createApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: '20kb' }));

  // API
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/api/contact', contactRoutes);
  app.use('/api', notFound);

  // En producción, el mismo servidor entrega el sitio React ya compilado.
  app.use(express.static(CLIENT_DIST));
  app.get('/{*splat}', (req, res, next) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'), (err) => err && next());
  });

  app.use(errorHandler);
  return app;
}
