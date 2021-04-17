import { IKoaAppContext } from "../typing";
import { KoaContextAware } from "../class";
import { Middleware, Next } from "koa";
import { camelCase } from "lodash";

export const controllerMiddleware = (Controller: typeof KoaContextAware): Middleware => async (
  ctx: IKoaAppContext,
  next: Next,
): Promise<void> => {
  /*
   * Ignoring TS here since KoaContextAware needs to be abstract
   * to ensure that all input at least attempts to be unique
   */
  // @ts-ignore
  ctx.controller[camelCase(Controller.name)] = new Controller(ctx);

  await next();
};
