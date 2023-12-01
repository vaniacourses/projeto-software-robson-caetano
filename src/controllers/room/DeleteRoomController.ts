import { NotFoundError } from "~/errors/domain/NotFoundError";
import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";

interface Params {
  id: number;
}

export class DeleteRoomController {
  constructor(private roomRepository: RoomRepositoryStrategy) {}

  async deleteRoom({ id }: Params) {
    const room = await this.roomRepository.getById(id);

    if (!room) {
      throw new NotFoundError("Sala não encontrada");
    }

    await this.roomRepository.delete(id);
  }
}
