import type { KoaContext, Middleware } from "../../typing";

export const initContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.cache = {};
  ctx.client = {};
  ctx.controller = {};
  ctx.entity = {};
  ctx.handler = {};
  ctx.issuer = {};
  ctx.keystore = {};
  ctx.metrics = {};
  ctx.repository = {};
  ctx.token = {};

  await next();
};
