import { IKoaAppContext } from "../../typing";
import { Middleware, Next } from "koa";
import { camelKeys, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware: Middleware = async (ctx: IKoaAppContext, next: Next): Promise<void> => {
  ctx.request.body = camelKeys(ctx.request.body) || {};

  await next();

  ctx.body = snakeKeys(ctx.body);
};
