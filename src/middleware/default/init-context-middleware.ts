import { IKoaAppContext } from "../../typing";
import { DefaultState, Middleware } from "koa";

export const initContextMiddleware: Middleware<DefaultState, IKoaAppContext> = async (ctx, next): Promise<void> => {
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
