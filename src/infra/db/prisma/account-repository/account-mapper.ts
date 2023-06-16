import { Account } from '@prisma/client';
import { AccountModel } from '../../../../domain/models/account';

export class AccountMapper {
  static toDomain(accountData: Account): AccountModel {
    return {
      id: accountData.id.toString(),
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
      profileImage: accountData.profile_image,
    };
  }
}
