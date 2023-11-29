import { Room } from "@prisma/client";

export interface RoomRepositoryStrategy {
  getById(id: number): Promise<Room | null>;

  create(name: string): Promise<Room>;

  list(): Promise<Room[]>;

  update(id: number, name: string): Promise<Room>;

  delete(id: number): Promise<void>;
}
