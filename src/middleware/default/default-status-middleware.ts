import { DefaultState, Middleware } from "koa";
import { HttpStatus } from "@lindorm-io/core";
import { IKoaAppContext } from "../../typing";

export const defaultStatusMiddleware: Middleware<DefaultState, IKoaAppContext> = async (ctx, next): Promise<void> => {
  ctx.body = {};
  ctx.status = HttpStatus.ClientError.NOT_FOUND;

  await next();
};
