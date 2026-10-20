import { createApp } from './app.js';
import { config, isSmtpConfigured } from './config/env.js';

createApp().listen(config.port, () => {
  console.info(`Servidor escuchando en http://localhost:${config.port}`);
  if (!isSmtpConfigured) console.info('SMTP sin configurar: las consultas se mostrarán en la consola.');
});
