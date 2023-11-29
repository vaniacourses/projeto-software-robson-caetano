import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";

export class ListRoomsController {
  constructor(private readonly roomRepository: RoomRepositoryStrategy) {}

  async listRooms() {
    const rooms = await this.roomRepository.list();

    return rooms;
  }
}
