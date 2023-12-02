import { compare, hash } from "bcrypt";
import { PasswordHasherStrategy } from "./PasswordHasherStrategy";

export class BcryptHasherStrategy implements PasswordHasherStrategy {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
