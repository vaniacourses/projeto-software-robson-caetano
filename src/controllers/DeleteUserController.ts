import { NotFoundError } from "~/errors/NotFoundError";
import { UserRepository } from "~/repositories/user/UserRepository";

interface Params {
  id: number;
}

export class DeleteUserController {
  constructor(private userRepository: UserRepository) {}

  async deleteUser({ id }: Params) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}
