import { AccountPrismaRepository } from './account';
import { PrismaHelper } from '../helpers/prisma-helper';

describe('Account Postgres Repository', () => {
  const testDbUrl =
    'postgresql://postgres:postgres@localhost:5432/rental_car_api_test?schema=public';
  beforeAll(async () => {
    await PrismaHelper.connect(testDbUrl);
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  const makeSut = (): AccountPrismaRepository => {
    return new AccountPrismaRepository();
  };

  beforeEach(async () => {
    await PrismaHelper.getClient().account.deleteMany();
  });

  test('Should return an account on success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      profileImage: 'any_image.png',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
    expect(account.profileImage).toBe('any_image.png');
  });
});
