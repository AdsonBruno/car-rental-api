import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AccountModel } from '../../../../domain/models/account';
import { PrismaHelper } from '../helpers/prisma-helper';
import { AccountMapper } from './account-mapper';

export class AccountPrismaRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await PrismaHelper.connect();

    const createdAccount = await PrismaHelper.getClient().account.create({
      data: {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        profile_image: accountData.profileImage,
      },
    });

    return AccountMapper.toDomain(createdAccount);
  }
}
