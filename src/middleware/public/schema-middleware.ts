import { KoaContext, Middleware } from "../../typing";
import { Schema, ValidationError } from "joi";
import { get } from "lodash";
import { ClientError } from "@lindorm-io/errors";

export const schemaMiddleware =
  (path: string, schema: Schema): Middleware<KoaContext> =>
  async (ctx, next): Promise<void> => {
    try {
      await schema.validateAsync(get(ctx, path));
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ClientError("Invalid request", {
          error: err,
          description: err.message,
          statusCode: ClientError.StatusCode.BAD_REQUEST,
        });
      }

      throw err;
    }

    await next();
  };
