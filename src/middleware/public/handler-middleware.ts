import { KoaContext, Middleware } from "../../typing";
import { KoaContextAware } from "../../class";
import { camelCase } from "lodash";

interface Options {
  key?: string;
}

export const handlerMiddleware =
  (Handler: typeof KoaContextAware, options?: Options): Middleware<KoaContext> =>
  async (ctx, next): Promise<void> => {
    const start = Date.now();

    /*
     * Ignoring TS here since KoaContextAware needs to be abstract
     * to ensure that all input at least attempts to be unique
     */
    // @ts-ignore
    ctx.handler[camelCase(options?.key || Handler.name)] = new Handler(ctx);

    ctx.metrics.handler = (ctx.metrics.handler || 0) + (Date.now() - start);

    await next();
  };
