import { HttpStatus } from "../../constant";
import { KoaContext, Middleware } from "../../typing";

export const errorMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    try {
      ctx.status = err.statusCode || err.status || HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: {
          code: err.code || null,
          data: err.data || {},
          description: err.description || null,
          message: err.message,
          name: err.name || null,
          title: err.title || null,
        },
      };

      ctx.logger.error("Service Error", err);
    } catch (err) {
      ctx.status = HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: {
          name: "UnexpectedError",
          title: "Unexpected Error",
          message: "Something went wrong",
        },
      };

      ctx.app.emit("error", err);
    }
  }
};
