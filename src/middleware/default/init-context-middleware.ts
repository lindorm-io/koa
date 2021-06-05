import type { KoaContext, Middleware } from "../../typing";

export const initContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.client = {};
  ctx.controller = {};
  ctx.entity = {};
  ctx.handler = {};
  ctx.metrics = {};
  ctx.token = {};

  await next();
};
