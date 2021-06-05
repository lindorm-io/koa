import { KoaContext, Middleware } from "../../typing";
import { getAuthorization } from "../../util";

export const utilContextMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.getAuthorization = getAuthorization(ctx);

  await next();
};
