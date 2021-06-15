import { KoaContext, Middleware } from "../../typing";
import { camelKeys, isObjectStrict, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.request.body = isObjectStrict(ctx.request.body) ? camelKeys(ctx.request.body) : {};

  await next();

  ctx.body = isObjectStrict(ctx.body) ? snakeKeys(ctx.body) : ctx.body;
};
