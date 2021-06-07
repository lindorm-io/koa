import { HttpStatus } from "@lindorm-io/core";
import { KoaContext, Middleware } from "../../typing";

export const errorMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    try {
      ctx.status = err.statusCode || err.status || HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: {
          name: err.name || null,
          title: err.public?.title || err.title || null,
          message: err.message,
          description: err.public?.description || err.description || null,
          data: err.public?.data || err.data || {},
        },
      };

      ctx.logger.error("Service Error", err);
    } catch (err) {
      ctx.status = HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
      ctx.body = { error: err };

      ctx.app.emit("error", err);
    }
  }
};
