import { IKoaAppContext } from "../../typing";
import { Middleware, Next } from "koa";

export const initContextMiddleware: Middleware = async (ctx: IKoaAppContext, next: Next): Promise<void> => {
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
