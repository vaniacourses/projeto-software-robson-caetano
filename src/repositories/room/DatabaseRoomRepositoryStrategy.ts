import { PrismaClient, PrismaSingleton } from "~/config/database";
import { RoomRepositoryStrategy } from "./RoomRepositoryStrategy";
import { Room } from "@prisma/client";

export class DatabaseRoomRepositoryStrategy implements RoomRepositoryStrategy {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async getById(id: number): Promise<Room | null> {
    return this.db.room.findUnique({ where: { id }, include: { ProductDistribution: true } });
  }

  public async create(name: string): Promise<Room> {
    return this.db.room.create({ data: { name } });
  }

  public async list(): Promise<Room[]> {
    return this.db.room.findMany({ include: { ProductDistribution: true } });
  }

  public async update(id: number, name: string): Promise<Room> {
    return this.db.room.update({ where: { id }, data: { name } });
  }

  public async delete(id: number): Promise<void> {
    await this.db.room.delete({ where: { id } });
  }
}
