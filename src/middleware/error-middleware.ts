import { Context } from "koa";
import { HttpStatus } from "@lindorm-io/core";
import { TNext } from "../typing";

export const errorMiddleware = async (ctx: Context, next: TNext): Promise<void> => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.ServerError.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: {
        code: error.errorCode || error.code || null,
        data: error.publicData || error.data || null,
        details: error.details || null,
        message: error.message,
        name: error.name || null,
        title: error.title || null,
      },
    };

    ctx.app.emit("error", error);
  }
};
