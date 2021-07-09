import { KoaContext, Middleware } from "../../typing";
import { camelKeys, isObjectStrict, snakeKeys } from "@lindorm-io/core";
import { merge } from "lodash";

export const caseSwitchMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.params = isObjectStrict(ctx.params) ? camelKeys(ctx.params) : {};
  ctx.query = isObjectStrict(ctx.query) ? camelKeys(ctx.query) : {};
  ctx.request.body = isObjectStrict(ctx.request.body) ? camelKeys(ctx.request.body) : {};
  ctx.data = merge(ctx.params, ctx.query, ctx.request.body);

  await next();

  ctx.body = isObjectStrict(ctx.body) ? snakeKeys(ctx.body) : ctx.body;
};
