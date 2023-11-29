import { NotFoundError } from "~/errors/NotFoundError";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

interface Params {
  id: number;
}

export class DeleteUserController {
  constructor(private userRepository: UserRepositoryStrategy) {}

  async deleteUser({ id }: Params) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}
