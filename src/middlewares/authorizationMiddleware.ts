import { NextFunction, Request, Response } from "express";
import { Role, User } from "@prisma/client";
import { AuthorizationService } from "~/services/authorization/AuthorizationService";
import { DatabaseSessionRepositoryStrategy } from "~/repositories/session/DatabaseSessionRepositoryStrategy";

export interface AuthenticatedRequest extends Request {
  user: User;
  token: string;
}

export function authorizationMiddleware(allowedRoles: Role[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const sessionRepository = new DatabaseSessionRepositoryStrategy();

    const token = req.headers.authorization?.split(" ")[1];

    const { session, user } = await new AuthorizationService(
      sessionRepository,
    ).authorizeUser(token, allowedRoles);

    (req as AuthenticatedRequest).user = user;
    (req as AuthenticatedRequest).token = session.token;

    next();
  };
}
