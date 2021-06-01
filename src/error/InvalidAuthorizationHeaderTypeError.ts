import { APIError } from "@lindorm-io/errors";
import { HttpStatus } from "@lindorm-io/core";

export class InvalidAuthorizationHeaderTypeError extends APIError {
  public constructor(type: string) {
    super("Invalid Authorization Header type", {
      debug: { type },
      statusCode: HttpStatus.ClientError.BAD_REQUEST,
    });
  }
}
