import { PrismaHelper } from '../../infra/db/prisma/helpers/prisma-helper';
import app from '../config/app';
import request from 'supertest';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    const testDbUrl =
      'postgresql://postgres:postgres@localhost:5432/rental_car_api_test?schema=public';
    await PrismaHelper.connect(testDbUrl);
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Adson BRuno',
        email: 'adsonbruno2@gmail.com',
        password: '123',
        passwordConfirmation: '123',
        profileImage: 'any_image.png',
      })
      .expect(200);
  });
});
