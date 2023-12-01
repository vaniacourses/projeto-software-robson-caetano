import { Session } from "@prisma/client";

export interface SessionRepositoryStrategy {
  create(userId: number, token: string): Promise<Session>;
}
