import { NotFoundError } from "~/errors/domain/NotFoundError";
import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";

interface Params {
  id: number;
  name: string;
}

export class UpdateRoomController {
  constructor(private readonly roomRepository: RoomRepositoryStrategy) {}

  async updateRoom({ id, name }: Params) {
    let room = await this.roomRepository.getById(id);

    if (!room) {
      throw new NotFoundError("Sala não encontrada");
    }

    room = await this.roomRepository.update(id, name);

    return room;
  }
}
