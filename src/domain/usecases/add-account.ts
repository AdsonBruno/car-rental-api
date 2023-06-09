import { AccountModel } from '../models/account';

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
}

export interface AddAccount {
  add(account: AddAccountModel): AccountModel;
}
