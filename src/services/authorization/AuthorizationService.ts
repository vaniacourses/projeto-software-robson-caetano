import { User, Session } from "@prisma/client";
import { UnauthorizedError } from "~/errors/domain/UnauthorizedError";
import { SessionRepositoryStrategy } from "~/repositories/session/SessionRepositoryStrategy";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export class AuthorizationService {
  constructor(private readonly sessionRepository: SessionRepositoryStrategy) {}

  async authorizeUser(
    token: string | undefined,
    allowedRoles: string[],
  ): Promise<{ user: User; session: Session }> {
    const message = "Erro ao autenticar usuário";

    if (!token) {
      throw new UnauthorizedError(message);
    }

    const session = await this.sessionRepository.getByToken(token);

    if (!session) {
      throw new UnauthorizedError(message);
    }

    // check if session wasn't created more than 7 days ago
    const isSessionValid =
      new Date(session.createdAt) >= new Date(Date.now() - ONE_WEEK);

    if (!isSessionValid) {
      throw new UnauthorizedError(message);
    }

    const hasAllowedRole = allowedRoles.includes(session.user.role ?? "");

    if (!hasAllowedRole) {
      throw new UnauthorizedError(message);
    }

    return {
      user: session.user,
      session,
    };
  }
}
