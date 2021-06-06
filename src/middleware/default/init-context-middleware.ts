import { KoaContext, Middleware } from "../../typing";

export const initContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.axios = {};
  ctx.cache = {};
  ctx.client = {};
  ctx.controller = {};
  ctx.entity = {};
  ctx.handler = {};
  ctx.keys = [];
  ctx.keystore = {};
  ctx.metrics = {};
  ctx.repository = {};
  ctx.token = {};

  await next();
};
