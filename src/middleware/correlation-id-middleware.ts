import { IKoaAppContext } from "../typing";
import { TPromise } from "@lindorm-io/global";
import { v1 as uuid } from "uuid";

export const correlationIdMiddleware = async (ctx: IKoaAppContext, next: TPromise<void>) => {
  ctx.id = ctx.get("X-Correlation-ID") || uuid();

  await next();
};
