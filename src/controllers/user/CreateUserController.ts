import { ConflictError } from "~/errors/domain/ConflictError";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";
import { PasswordHasherStrategy } from "~/services/password-hasher/PasswordHasherStrategy";

interface Params {
  name: string;
  email: string;
  password: string;
}

export class CreateUserController {
  constructor(
    private userRepository: UserRepositoryStrategy,
    private passwordHasherStrategy: PasswordHasherStrategy,
  ) {}

  async createUser({ name, email, password }: Params) {
    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new ConflictError("Email já cadastrado");
    }

    const passwordHash = await this.passwordHasherStrategy.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    return user;
  }
}
