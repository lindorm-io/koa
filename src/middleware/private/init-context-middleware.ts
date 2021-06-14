import { KoaContext, Middleware } from "../../typing";

export const initContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.axios = {};
  ctx.cache = {};
  ctx.client = {};
  ctx.entity = {};
  ctx.keys = [];
  ctx.metrics = {};
  ctx.repository = {};
  ctx.token = {};

  await next();
};
