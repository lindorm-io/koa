import { KoaContext, Middleware } from "../../typing";

export const initContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.client = {};
  ctx.controller = {};
  ctx.entity = {};
  ctx.handler = {};
  ctx.io = {};
  ctx.jwt = {};
  ctx.metrics = {};
  ctx.token = {};

  await next();
};
