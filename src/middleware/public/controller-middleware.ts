import { IKoaAppContext } from "../../typing";
import { KoaContextAware } from "../../class";
import { DefaultState, Middleware, Next } from "koa";
import { camelCase } from "lodash";

interface ControllerMiddlewareOptions {
  key?: string;
}

export const controllerMiddleware =
  (
    Controller: typeof KoaContextAware,
    options?: ControllerMiddlewareOptions,
  ): Middleware<DefaultState, IKoaAppContext> =>
  async (ctx: IKoaAppContext, next: Next): Promise<void> => {
    /*
     * Ignoring TS here since KoaContextAware needs to be abstract
     * to ensure that all input at least attempts to be unique
     */
    // @ts-ignore
    ctx.controller[camelCase(options?.key || Controller.name)] = new Controller(ctx);

    await next();
  };
