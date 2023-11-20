import httpStatus from "http-status";
import { z } from "zod";
import { Request, Response } from "express";
import { UserDAO } from "~/daos/UserDAO";

export class ListUsersController {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  async listUsers(_: Request, res: Response) {
    try {
      const users = await this.userDAO.list();

      res.status(httpStatus.OK).json(users);
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
