import { UserRepository } from "~/repositories/user/UserRepository";

export class ListUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async listUsers() {
    const users = await this.userRepository.list();

    return users;
  }
}
