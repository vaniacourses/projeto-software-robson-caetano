import { SessionRepositoryStrategy } from "~/repositories/session/SessionRepositoryStrategy";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export class AuthorizationService {
  constructor(private readonly sessionRepository: SessionRepositoryStrategy) {}

  async isAuthorized(token: string, allowedRoles: string[]): Promise<boolean> {
    const session = await this.sessionRepository.getByToken(token);

    if (!session) {
      return false;
    }

    // check if session wasn't created more than 7 days ago
    const isSessionValid =
      new Date(session.createdAt) >= new Date(Date.now() - ONE_WEEK);

    if (!isSessionValid) {
      return false;
    }

    const hasAllowedRole = allowedRoles.includes(session.user.role ?? "");

    if (!hasAllowedRole) {
      return false;
    }

    return true;
  }
}
