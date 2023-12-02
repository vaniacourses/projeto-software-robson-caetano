import { NextFunction, Request, Response } from "express";
import { HttpErrorFactory } from "~/errors/http/httpErrorFactory";

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  const httpError = HttpErrorFactory.create(error);

  return res.status(httpError.statusCode).json({
    message: httpError.message,
  });
}
