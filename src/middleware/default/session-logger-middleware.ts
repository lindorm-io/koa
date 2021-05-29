import { DefaultState, Middleware } from "koa";
import { IKoaAppContext } from "../../typing";
import { Logger } from "@lindorm-io/winston";

export interface ISessionLoggerMiddlewareOptions {
  logger: Logger;
}

export const sessionLoggerMiddleware =
  (options: ISessionLoggerMiddlewareOptions): Middleware<DefaultState, IKoaAppContext> =>
  async (ctx, next): Promise<void> => {
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
