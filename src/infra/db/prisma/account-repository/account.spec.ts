import { AccountPrismaRepository } from './account';
import { PrismaHelper } from './helpers/prisma-helper';

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect();
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  const makeSut = (): AccountPrismaRepository => {
    return new AccountPrismaRepository();
  };

  test('Should return an account on success', async () => {
    // const sut = new AccountPrismaRepository();
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
