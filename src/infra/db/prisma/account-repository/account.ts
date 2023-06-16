import { PrismaClient } from '@prisma/client';
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AccountModel } from '../../../../domain/models/account';

export class AccountPrismaRepository implements AddAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await this.prisma.$connect();

    const createdAccount = await this.prisma.account.create({
      data: {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        profile_image: accountData.profileImage,
      },
    });

    return {
      id: createdAccount.id.toString(),
      name: createdAccount.name,
      email: createdAccount.email,
      password: createdAccount.password,
      profileImage: createdAccount.profile_image,
    };
  }
}
