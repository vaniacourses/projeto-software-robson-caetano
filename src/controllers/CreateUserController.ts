import httpStatus from "http-status";
import { z } from "zod";
import { Request, Response } from "express";
import { UserDAO } from "~/daos/UserDAO";
import { UserSchema } from "~/schemas/user/createUserSchema";

export class CreateUserController {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(req: Request, res: Response) {
    try {
      const parsedData = UserSchema.parse(req.body);

      const existingUser = await this.userDAO.getByEmail(parsedData.email);

      if (existingUser) {
        return res.status(httpStatus.CONFLICT).json({
          message: "Email já cadastrado",
        });
      }

      const user = await this.userDAO.create(parsedData.name, parsedData.email);

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
