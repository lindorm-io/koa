import { AuthorizationHeader } from "../typing";
import { ClientError } from "@lindorm-io/errors";
import { KoaContext } from "../typing";

export const getAuthorization = (ctx: KoaContext) => (): AuthorizationHeader => {
  const header = ctx.get("Authorization");

  if (!header) {
    throw new ClientError("Invalid Authorization header", {
      developer: {
        details: "Header is missing",
      },
      statusCode: ClientError.StatusCode.BAD_REQUEST,
    });
  }

  const split = header.split(" ");

  if (split.length !== 2) {
    throw new ClientError("Invalid Authorization header", {
      developer: {
        debug: { header },
        details: "Header must include two strings",
      },
      statusCode: ClientError.StatusCode.BAD_REQUEST,
    });
  }

  const type = split[0];
  const value = split[1];

  switch (type) {
    case "Basic":
    case "Bearer":
      break;

    default:
      throw new ClientError("Invalid Authorization header", {
        developer: {
          debug: { header, type, value },
          details: "Invalid header type",
        },
        statusCode: ClientError.StatusCode.BAD_REQUEST,
      });
  }

  return { type, value };
};
