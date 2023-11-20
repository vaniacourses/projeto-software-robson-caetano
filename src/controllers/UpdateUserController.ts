import httpStatus from "http-status";
import { z } from "zod";
import { Request, Response } from "express";
import { UserDAO } from "~/daos/UserDAO";
import { UserSchema } from "~/schemas/user/createUserSchema";

export class UpdateUserController {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(req: Request, res: Response) {
    try {
      const parsedData = UserSchema.parse(req.body);
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: "Id inválido",
        });
      }

      let user = await this.userDAO.getById(Number(req.params.id));

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Usuário não encontrado",
        });
      }

      user = await this.userDAO.update(id, parsedData.name, parsedData.email);

      res.status(httpStatus.OK).json(user);
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
