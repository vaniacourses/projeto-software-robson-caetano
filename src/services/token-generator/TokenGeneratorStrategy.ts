export interface TokenGeneratorStrategy {
  generateToken(): Promise<string>;
}
