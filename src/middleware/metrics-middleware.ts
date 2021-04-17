import { IKoaAppContext } from "../typing";
import { Next } from "koa";

export const metricsMiddleware = async (ctx: IKoaAppContext, next: Next): Promise<void> => {
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
