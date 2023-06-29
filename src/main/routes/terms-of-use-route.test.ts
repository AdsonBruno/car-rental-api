import app from '../config/app';
import request from 'supertest';

describe('TermsOfUse route', () => {
  test('Should return an terms of use', async () => {
    const response = await request(app).get('/api/terms-of-use.pdf');
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toBe('application/pdf');
    expect(response.body).toBeInstanceOf(Buffer);
  });
});
