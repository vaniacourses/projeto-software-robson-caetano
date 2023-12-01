import { Session, User } from "@prisma/client";

export interface SessionRepositoryStrategy {
  create(userId: number, token: string): Promise<Session>;

  getByToken(token: string): Promise<(Session & { user: User }) | null>;
}
