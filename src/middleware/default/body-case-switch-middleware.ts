import { DefaultState, Middleware } from "koa";
import { IKoaAppContext } from "../../typing";
import { camelKeys, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware: Middleware<DefaultState, IKoaAppContext> = async (ctx, next): Promise<void> => {
  ctx.request.body = camelKeys(ctx.request.body) || {};

  await next();

  ctx.body = snakeKeys(ctx.body);
};
