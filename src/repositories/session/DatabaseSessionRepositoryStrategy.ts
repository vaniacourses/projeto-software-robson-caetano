import { PrismaClient, PrismaSingleton } from "~/config/database";
import { Session, User } from "@prisma/client";
import { SessionRepositoryStrategy } from "./SessionRepositoryStrategy";

export class DatabaseSessionRepositoryStrategy
  implements SessionRepositoryStrategy
{
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  async getByToken(token: string): Promise<(Session & { user: User }) | null> {
    const session = await this.db.session.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    return session;
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
