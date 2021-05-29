import { DefaultState, Middleware } from "koa";
import { IKoaAppContext } from "../../typing";

export const metricsMiddleware: Middleware<DefaultState, IKoaAppContext> = async (ctx, next): Promise<void> => {
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
