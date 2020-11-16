import { IKoaAppContext } from "../typing";
import { Logger } from "@lindorm-io/winston";
import { TPromise } from "@lindorm-io/core";

export interface ISessionLoggerMiddlewareOptions {
  logger: Logger;
}

export const sessionLoggerMiddleware = (options: ISessionLoggerMiddlewareOptions) => async (
  ctx: IKoaAppContext,
  next: TPromise<void>,
) => {
  ctx.logger = options.logger.createSessionLogger({ correlationId: ctx.metadata.correlationId });

  await next();

  ctx.logger.info("Service Response", {
    request: ctx.request,
    metadata: ctx.metadata,
    response: ctx.response,
  });
};
