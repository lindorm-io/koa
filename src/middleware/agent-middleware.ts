import { IKoaAppContext } from "../typing";
import { Middleware, Next } from "koa";

interface IKoaMetadataMiddleware extends IKoaAppContext {
  userAgent: Record<string, any>;
}

export const agentMiddleware: Middleware = async (ctx: IKoaMetadataMiddleware, next: Next): Promise<void> => {
  ctx.agent = {
    browser: ctx.userAgent?.browser || null,
    geoIp: ctx.userAgent?.geoIp || null,
    os: ctx.userAgent?.os || null,
    platform: ctx.userAgent?.platform || null,
    source: ctx.userAgent?.source || null,
    version: ctx.userAgent?.version || null,
  };

  await next();
};
