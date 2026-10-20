/** Configuración leída de variables de entorno, con valores por defecto para desarrollo. */
export const config = {
  port: Number(process.env.PORT) || 3001,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  contactTo: process.env.CONTACT_TO || 'lucesvilladeldique@gmail.com',
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export const isSmtpConfigured = Boolean(config.smtp.host && config.smtp.user && config.smtp.pass);
