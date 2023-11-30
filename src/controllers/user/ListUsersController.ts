import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

export class ListUsersController {
  constructor(private readonly userRepository: UserRepositoryStrategy) {}

  async listUsers() {
    const users = await this.userRepository.list();

    return users;
  }
}
