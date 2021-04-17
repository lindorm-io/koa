import { HttpStatus } from "@lindorm-io/core";
import { IKoaAppContext } from "../typing";
import { Middleware, Next } from "koa";

export const defaultStatusMiddleware: Middleware = async (ctx: IKoaAppContext, next: Next): Promise<void> => {
  ctx.body = {};
  ctx.status = HttpStatus.ClientError.NOT_FOUND;

  await next();
};
