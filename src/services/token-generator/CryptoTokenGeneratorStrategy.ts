import { TokenGeneratorStrategy } from "./TokenGeneratorStrategy";
import { randomBytes } from "crypto";

export class CryptoTokenGeneratorStrategy implements TokenGeneratorStrategy {
  async generateToken(): Promise<string> {
    const token = randomBytes(32).toString("hex");

    return token;
  }
}
