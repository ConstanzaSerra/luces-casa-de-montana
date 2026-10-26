import { afterEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../../functions/api/contact.js';

const validContact = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  checkIn: '2026-12-20',
  checkOut: '2026-12-24',
  guests: 2,
  message: 'Hola, quería consultar disponibilidad para esas fechas.',
};

const post = (body, env = {}) =>
  onRequestPost({
    request: new Request('https://example.com/api/contact', {
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    env,
  });

describe('Cloudflare: POST /api/contact', () => {
  afterEach(() => mock.restoreAll());

  it('envía la consulta por Resend con los datos validados', async () => {
    const fetchMock = mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 200 }));
    const res = await post(validContact, { RESEND_API_KEY: 're_test', CONTACT_TO: 'dueña@example.com' });

    assert.equal(res.status, 201);
    const [url, options] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.headers.Authorization, 'Bearer re_test');
    const sent = JSON.parse(options.body);
    assert.equal(sent.to, 'dueña@example.com');
    assert.equal(sent.reply_to, 'ana@example.com');
    assert.match(sent.subject, /Ana Pérez/);
  });

  it('rechaza datos inválidos sin llamar a Resend', async () => {
    const fetchMock = mock.method(globalThis, 'fetch', async () => new Response('{}'));
    const res = await post({ name: 'A', email: 'x', message: 'corto' }, { RESEND_API_KEY: 're_test' });

    assert.equal(res.status, 400);
    assert.ok((await res.json()).fields.email);
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  it('rechaza un cuerpo que no es JSON', async () => {
    const res = await post('esto no es json');
    assert.equal(res.status, 400);
  });

  it('ignora en silencio los envíos de bots (honeypot)', async () => {
    const fetchMock = mock.method(globalThis, 'fetch', async () => new Response('{}'));
    const res = await post({ ...validContact, website: 'spam.com' }, { RESEND_API_KEY: 're_test' });

    assert.equal(res.status, 200);
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  it('devuelve un error amable si Resend falla', async () => {
    mock.method(globalThis, 'fetch', async () => new Response('invalid key', { status: 403 }));
    mock.method(console, 'error', () => {});
    const res = await post(validContact, { RESEND_API_KEY: 're_mala' });
    assert.equal(res.status, 502);
  });
});
