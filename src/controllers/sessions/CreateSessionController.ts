import { Session } from "@prisma/client";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { SessionRepositoryStrategy } from "~/repositories/session/SessionRepositoryStrategy";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";
import { TokenGeneratorStrategy } from "~/services/token-generator/TokenGeneratorStrategy";

interface Params {
  userId: number;
}

export class CreateSessionController {
  constructor(
    private userRepository: UserRepositoryStrategy,
    private sessionRepository: SessionRepositoryStrategy,
    private tokenGenerator: TokenGeneratorStrategy,
  ) {}

  async createSession({ userId }: Params): Promise<Session> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const token = await this.tokenGenerator.generateToken();

    const session = await this.sessionRepository.create(userId, token);

    return session;
  }
}
