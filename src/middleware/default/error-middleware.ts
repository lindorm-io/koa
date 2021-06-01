import { HttpStatus } from "@lindorm-io/core";
import type { KoaContext, Middleware } from "../../typing";

export const errorMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: {
        code: err.errorCode || err.code || null,
        data: err.publicData || err.data || null,
        details: err.details || null,
        message: err.message,
        name: err.name || null,
        title: err.title || null,
      },
    };

    ctx.app.emit("error", err);
  }
};
