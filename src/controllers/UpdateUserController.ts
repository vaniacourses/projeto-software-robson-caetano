import { NotFoundError } from "~/errors/domain/NotFoundError";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

interface Params {
  id: number;
  name: string;
  email: string;
}

export class UpdateUserController {
  constructor(private readonly userRepository: UserRepositoryStrategy) {}

  async updateUser({ id, name, email }: Params) {
    let user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    user = await this.userRepository.update(id, name, email);

    return user;
  }
}
