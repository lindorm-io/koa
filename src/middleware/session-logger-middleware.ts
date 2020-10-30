import { IKoaAppContext } from "../typing";
import { Logger } from "@lindorm-io/winston";
import { TPromise } from "@lindorm-io/global";
import { v1 as uuid } from "uuid";

export interface ISessionLoggerMiddlewareOptions {
  logger: Logger;
}

export const sessionLoggerMiddleware = (options: ISessionLoggerMiddlewareOptions) => async (
  ctx: IKoaAppContext,
  next: TPromise<void>,
) => {
  ctx.logger = options.logger.createSessionLogger({ id: ctx.id || uuid() });

  await next();

  ctx.logger.info("API Response", {
    request: ctx.request,
    response: ctx.response,
  });
};
