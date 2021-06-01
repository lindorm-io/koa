import { APIError } from "@lindorm-io/errors";
import { HttpStatus } from "@lindorm-io/core";

export class MissingAuthorizationHeaderError extends APIError {
  public constructor() {
    super("Missing Authorization Header", {
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }
}
