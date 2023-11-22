import httpStatus from "http-status";
import { z } from "zod";
import { Request, Response } from "express";
import { UserDAO } from "~/daos/UserDAO";
import { UserRepository } from "~/repositories/user/UserRepository";

export class DeleteUserController {
  private userDAO: UserDAO;

  constructor(private userRepository: UserRepository) {}

  async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: "Id inválido",
        });
      }

      const user = await this.userDAO.getById(Number(req.params.id));

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Usuário não encontrado",
        });
      }

      await this.userDAO.delete(id);

      res.sendStatus(httpStatus.NO_CONTENT);
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
