import { PrismaClient, PrismaSingleton } from "~/config/database";
import { Session } from "@prisma/client";
import { SessionRepositoryStrategy } from "./SessionRepositoryStrategy";

export class DatabaseSessionRepositoryStrategy
  implements SessionRepositoryStrategy
{
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  async create(userId: number, token: string): Promise<Session> {
    const session = await this.db.session.create({
      data: {
        userId,
        token,
      },
    });

    return session;
  }
}
