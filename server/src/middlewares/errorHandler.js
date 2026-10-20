/** Respuesta 404 para rutas de API inexistentes. */
export function notFound(req, res) {
  res.status(404).json({ error: 'Recurso no encontrado.' });
}

/** Manejo central de errores: loguea el detalle y devuelve un mensaje genérico. */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status === 500 ? 'Ocurrió un error inesperado. Probá de nuevo más tarde.' : err.message,
  });
}
