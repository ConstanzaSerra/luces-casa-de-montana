import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

const validContact = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  phone: '351 555 1234',
  checkIn: '2026-12-20',
  checkOut: '2026-12-24',
  guests: 2,
  message: 'Hola, quería consultar disponibilidad para esas fechas.',
};

describe('POST /api/contact', () => {
  it('acepta una consulta válida', async () => {
    const res = await request(app).post('/api/contact').send(validContact);
    assert.equal(res.status, 201);
    assert.match(res.body.message, /Gracias/);
  });

  it('rechaza datos inválidos con errores por campo', async () => {
    const res = await request(app).post('/api/contact').send({ name: 'A', email: 'no-es-mail', message: 'corto' });
    assert.equal(res.status, 400);
    assert.ok(res.body.fields.name);
    assert.ok(res.body.fields.email);
    assert.ok(res.body.fields.message);
  });

  it('rechaza una salida anterior a la llegada', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validContact, checkIn: '2026-12-24', checkOut: '2026-12-20' });
    assert.equal(res.status, 400);
    assert.ok(res.body.fields.checkOut);
  });

  it('ignora en silencio los envíos de bots (honeypot)', async () => {
    const res = await request(app).post('/api/contact').send({ ...validContact, website: 'spam.com' });
    assert.equal(res.status, 200);
  });
});

describe('GET /api/health', () => {
  it('responde ok', async () => {
    const res = await request(app).get('/api/health');
    assert.deepEqual(res.body, { status: 'ok' });
  });
});
