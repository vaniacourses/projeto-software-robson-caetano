import httpStatus from "http-status";
import { z } from "zod";
import { Request, Response } from "express";
import { UserSchema } from "~/schemas/user/createUserSchema";
import { UserRepository } from "~/repositories/user/UserRepository";

export class CreateUserController {
  constructor(private userRepository: UserRepository) {}

  async createUser(req: Request, res: Response) {
    try {
      const parsedData = UserSchema.parse(req.body);

      const existingUser = await this.userRepository.getByEmail(
        parsedData.email,
      );

      if (existingUser) {
        return res.status(httpStatus.CONFLICT).json({
          message: "Email já cadastrado",
        });
      }

      const user = await this.userRepository.create(
        parsedData.name,
        parsedData.email,
      );

      res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      // instance of zod error
      if (error instanceof z.ZodError) {
        return res.status(httpStatus.BAD_REQUEST).json(error.issues);
      }

      console.error(error);
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
