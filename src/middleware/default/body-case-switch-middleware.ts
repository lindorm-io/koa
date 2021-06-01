import type { KoaContext, Middleware } from "../../typing";
import { camelKeys, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.request.body = ctx.request.body ? camelKeys(ctx.request.body) : {};

  await next();

  ctx.body = ctx.body ? snakeKeys(ctx.body) : ctx.body;
};
