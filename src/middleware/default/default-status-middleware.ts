import { HttpStatus } from "@lindorm-io/core";
import type { KoaContext, Middleware } from "../../typing";

export const defaultStatusMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.body = {};
  ctx.status = HttpStatus.ClientError.NOT_FOUND;

  await next();
};
