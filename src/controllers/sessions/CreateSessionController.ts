import { Session } from "@prisma/client";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { SessionRepositoryStrategy } from "~/repositories/session/SessionRepositoryStrategy";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";
import { PasswordHasherStrategy } from "~/services/password-hasher/PasswordHasherStrategy";
import { TokenGeneratorStrategy } from "~/services/token-generator/TokenGeneratorStrategy";

interface Params {
  email: string;
  password: string;
}

export class CreateSessionController {
  constructor(
    private userRepository: UserRepositoryStrategy,
    private sessionRepository: SessionRepositoryStrategy,
    private passwordHasher: PasswordHasherStrategy,
    private tokenGenerator: TokenGeneratorStrategy,
  ) {}

  async createSession({ email, password }: Params): Promise<Session> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const passwordValid = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new NotFoundError("Senha inválida");
    }

    const token = await this.tokenGenerator.generateToken();

    return this.sessionRepository.create(user.id, token);
  }
}
