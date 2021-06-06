import { KoaContext, Middleware } from "../../typing";
import { KoaContextAware } from "../../class";
import { camelCase } from "lodash";

interface Options {
  key?: string;
}

export const controllerMiddleware =
  (Controller: typeof KoaContextAware, options?: Options): Middleware<KoaContext> =>
  async (ctx, next): Promise<void> => {
    const start = Date.now();

    /*
     * Ignoring TS here since KoaContextAware needs to be abstract
     * to ensure that all input at least attempts to be unique
     */
    // @ts-ignore
    ctx.controller[camelCase(options?.key || Controller.name)] = new Controller(ctx);

    ctx.metrics.controller = (ctx.metrics.controller || 0) + (Date.now() - start);

    await next();
  };
