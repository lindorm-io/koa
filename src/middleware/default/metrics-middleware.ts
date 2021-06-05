import { KoaContext, Middleware } from "../../typing";

export const metricsMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  const start = Date.now();

  try {
    await next();
  } finally {
    const stop = Date.now() - start;

    ctx.metrics.responseTime = stop;

    ctx.logger.debug("metrics", ctx.metrics);

    ctx.set("X-Response-Time", `${stop}ms`);
  }
};
