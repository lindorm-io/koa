import {
  InvalidAuthorizationHeaderLengthError,
  InvalidAuthorizationHeaderTypeError,
  MissingAuthorizationHeaderError,
} from "../error";
import { KoaContext } from "../typing";

export interface AuthorizationHeader {
  type: string;
  value: string;
}

export const getAuthorization = (ctx: KoaContext) => (): AuthorizationHeader => {
  const header = ctx.get("Authorization");

  if (!header) {
    throw new MissingAuthorizationHeaderError();
  }

  const split = header.split(" ");

  if (split.length !== 2) {
    throw new InvalidAuthorizationHeaderLengthError(header);
  }

  const type = split[0];
  const value = split[1];

  switch (type) {
    case "Basic":
    case "Bearer":
      break;

    default:
      throw new InvalidAuthorizationHeaderTypeError(type);
  }

  return { type, value };
};
