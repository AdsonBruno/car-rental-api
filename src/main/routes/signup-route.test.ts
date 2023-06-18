import { AccountPrismaRepository } from '../../infra/db/prisma/account-repository/account';
import { PrismaHelper } from '../../infra/db/prisma/helpers/prisma-helper';
import app from '../config/app';
import request from 'supertest';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect();
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Adson',
        email: 'adsonbruno2@gmail.com',
        password: '123',
        passwordConfirmation: '123',
        profileImage: 'any_image.png',
      })
      .expect(200);
  });
});
