import { IKoaAppContext, TNext } from "../typing";

export const metricsMiddleware = async (ctx: IKoaAppContext, next: TNext): Promise<void> => {
  const start = Date.now();

  ctx.metrics = {
    ...(ctx.metrics || {}),
  };

  try {
    await next();
  } finally {
    const stop = Date.now() - start;

    ctx.metrics = {
      ...(ctx.metrics || {}),
      responseTime: stop,
    };
    ctx.logger.debug("metrics", ctx.metrics);

    ctx.set("X-Response-Time", `${stop}ms`);
  }
};
