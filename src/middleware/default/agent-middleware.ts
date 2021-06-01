import type { KoaContext, Middleware } from "../../typing";

interface AgentContext extends KoaContext {
  userAgent: Record<string, any>;
}

export const agentMiddleware: Middleware<AgentContext> = async (ctx, next): Promise<void> => {
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
