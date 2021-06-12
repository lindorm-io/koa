import { HttpStatus } from "../../constant";
import { KoaContext, Middleware } from "../../typing";

export const defaultStatusMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.body = {};
  ctx.status = HttpStatus.ClientError.NOT_FOUND;

  await next();
};
