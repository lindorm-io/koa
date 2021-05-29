import { DefaultState, Middleware } from "koa";
import { IKoaAppContext } from "../../typing";

interface IKoaAgentContext extends IKoaAppContext {
  userAgent: Record<string, any>;
}

export const agentMiddleware: Middleware<DefaultState, IKoaAgentContext> = async (ctx, next): Promise<void> => {
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
