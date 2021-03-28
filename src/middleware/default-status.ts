import { HttpStatus } from "@lindorm-io/core";
import { IKoaAppContext, TNext } from "../typing";

export const defaultStatusMiddleware = async (ctx: IKoaAppContext, next: TNext): Promise<void> => {
  ctx.body = {};
  ctx.status = HttpStatus.ClientError.NOT_FOUND;

  await next();
};
