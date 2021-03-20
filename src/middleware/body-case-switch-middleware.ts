import { IKoaAppContext } from "../typing";
import { TPromise, camelKeys, snakeKeys } from "@lindorm-io/core";

export const bodyCaseSwitchMiddleware = async (ctx: IKoaAppContext, next: TPromise<void>): Promise<void> => {
  ctx.request.body = camelKeys(ctx.request.body || {});

  await next();

  ctx.body = snakeKeys(ctx.body || {});
};
