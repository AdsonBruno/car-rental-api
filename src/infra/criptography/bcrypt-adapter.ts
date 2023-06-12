import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';

export class BCryptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt;
  }
  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, 12);
    return null;
  }
}
