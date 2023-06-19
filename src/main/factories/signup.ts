import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BCryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountPrismaRepository } from '../../infra/db/prisma/account-repository/account';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BCryptAdapter(salt);
  const accountPrismaRepository = new AccountPrismaRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPrismaRepository);
  return new SignUpController(emailValidatorAdapter, dbAddAccount);
};
