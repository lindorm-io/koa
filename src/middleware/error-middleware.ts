import { Context } from "koa";
import { HttpStatus, TPromise } from "@lindorm-io/core";

export const errorMiddleware = async (ctx: Context, next: TPromise<void>): Promise<void> => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: {
        code: error.errorCode || error.code,
        details: error.details,
        message: error.message,
        title: error.title,
      },
    };

    ctx.app.emit("error", error);
  }
};
