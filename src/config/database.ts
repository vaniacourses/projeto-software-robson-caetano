import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
  private static client: PrismaClient | null = null;

  private constructor() {}

  static getClient(): PrismaClient {
    if (!this.client) {
      console.log("instantiated");
      this.client = new PrismaClient();
    }

    return this.client;
  }
}

export type DatabseInstance = PrismaClient;
