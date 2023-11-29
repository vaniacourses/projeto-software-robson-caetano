import { NotFoundError } from "~/errors/NotFoundError";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

interface Params {
  name: string;
  email: string;
}

export class CreateUserController {
  constructor(private userRepository: UserRepositoryStrategy) {}

  async createUser({ name, email }: Params) {
    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new NotFoundError("Email já cadastrado");
    }

    const user = await this.userRepository.create(name, email);

    return user;
  }
}
