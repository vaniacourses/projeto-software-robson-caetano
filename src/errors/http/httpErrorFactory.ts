import httpStatus from "http-status";
import { ConflictError } from "~/errors/domain/ConflictError";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { HttpError } from "./HttpError";
import { UnprocessableEntityError } from "../domain/UnprocessableEntityError";

export class HttpErrorFactory {
  public static create(error: Error) {
    if (error instanceof NotFoundError) {
      return new HttpError(error.message, httpStatus.NOT_FOUND);
    }

    if (error instanceof ConflictError) {
      return new HttpError(error.message, httpStatus.CONFLICT);
    }

    if (error instanceof UnprocessableEntityError) {
      return new HttpError(error.message, httpStatus.UNPROCESSABLE_ENTITY)
    }

    return new HttpError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
