import { IKoaAppContext, TNext } from "../typing";
import { camelKeys, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware = async (ctx: IKoaAppContext, next: TNext): Promise<void> => {
  ctx.request.body = camelKeys(ctx.request.body || {});

  await next();

  ctx.body = snakeKeys(ctx.body || {});
};
