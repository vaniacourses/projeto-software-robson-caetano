import httpStatus from "http-status";
import { ConflictError } from "~/errors/domain/ConflictError";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { HttpError } from "./HttpError";

export class HttpErrorFactory {
  public static create(error: Error) {
    if (error instanceof NotFoundError) {
      return new HttpError(error.message, httpStatus.NOT_FOUND);
    }

    if (error instanceof ConflictError) {
      return new HttpError(error.message, httpStatus.CONFLICT);
    }

    return new HttpError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
