import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AccountModel } from '../../../../domain/models/account';
import { PrismaHelper } from '../helpers/prisma-helper';
import { AccountMapper } from './account-mapper';

export class AccountPrismaRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const testDbUrl =
      'postgresql://postgres:postgres@localhost:5432/rental_car_api_test?schema=public';
    await PrismaHelper.connect(testDbUrl);

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
