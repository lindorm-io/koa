import { KoaContext, Middleware } from "../../typing";
import { camelKeys, isObjectStrict, snakeKeys } from "@lindorm-io/core";

export const caseSwitchMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.request.body = isObjectStrict(ctx.request.body) ? camelKeys(ctx.request.body) : {};
  ctx.params = isObjectStrict(ctx.params) ? camelKeys(ctx.params) : {};

  await next();

  ctx.body = isObjectStrict(ctx.body) ? snakeKeys(ctx.body) : ctx.body;
};
