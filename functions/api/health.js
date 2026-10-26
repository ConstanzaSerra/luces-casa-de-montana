/** GET /api/health: sirve para comprobar que las funciones están desplegadas. */
export const onRequestGet = () => Response.json({ status: 'ok' });
