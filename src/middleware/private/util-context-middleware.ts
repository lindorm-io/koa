import { Metric } from "../../class";
import { KoaContext, Middleware } from "../../typing";
import { getAuthorization } from "../../util";

export const utilContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.getAuthorization = getAuthorization(ctx);
  ctx.getMetric = (key: string): Metric => new Metric(ctx, key);

  await next();
};
