import { KoaContext, Middleware } from "../../typing";

export const responseTimeMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  const metric = ctx.getMetric("responseTime");

  try {
    await next();
  } finally {
    metric.end();

    ctx.set("X-Response-Time", `${ctx.metrics.responseTime}ms`);
  }
};
