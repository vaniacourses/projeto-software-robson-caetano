import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";

interface Params {
  name: string;
}

export class CreateRoomController {
  constructor(private roomRepository: RoomRepositoryStrategy) {}

  async createRoom({ name }: Params) {
    const room = await this.roomRepository.create(name);

    return room;
  }
}
