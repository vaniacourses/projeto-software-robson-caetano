import { Role } from "@prisma/client";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

export class ListDoctorsController {
  constructor(private readonly userRepository: UserRepositoryStrategy) {}

  async listDoctors() {
    const doctors = await this.userRepository.listByRole(Role.DOCTOR);

    return doctors;
  }
}
