import { IKoaAppContext, TNext } from "../typing";
import { Logger } from "@lindorm-io/winston";
import { Middleware } from "koa";

export interface ISessionLoggerMiddlewareOptions {
  logger: Logger;
}

export const sessionLoggerMiddleware = (options: ISessionLoggerMiddlewareOptions): Middleware => async (
  ctx: IKoaAppContext,
  next: TNext,
): Promise<void>  => {
  ctx.logger = options.logger.createSessionLogger({ correlationId: ctx.metadata.correlationId });

  await next();

  ctx.logger.info("Service Response", {
    request: {
      agent: ctx.agent,
      header: ctx.request.header,
      metadata: ctx.metadata,
      method: ctx.request.method,
      params: ctx.params,
      url: ctx.request.url,
    },
    response: {
      body: ctx.response.body,
      header: ctx.response.header,
      message: ctx.response.message,
      status: ctx.response.status,
    },
  });
};
