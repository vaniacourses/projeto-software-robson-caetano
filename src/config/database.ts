import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
  private static client: PrismaClient | null = null;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!this.client) {
      this.client = new PrismaClient();
    }

    return this.client;
  }
}

export type { PrismaClient };
