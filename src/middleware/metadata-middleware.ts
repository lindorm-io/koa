import { IKoaAppContext } from "../typing";
import { Middleware, Next } from "koa";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export const metadataMiddleware: Middleware = async (ctx: IKoaAppContext, next: Next): Promise<void> => {
  ctx.metadata = {
    clientEnvironment: ctx.get("X-Client-Environment") || null,
    clientId: ctx.get("X-Client-ID") || null,
    clientName: ctx.get("X-Client-Name") || null,
    clientPlatform: ctx.get("X-Client-Platform") || null,
    clientVersion: ctx.get("X-Client-Version") || null,
    correlationId: ctx.get("X-Correlation-ID") || uuidv1(),
    deviceId: ctx.get("X-Device-ID") || null,
    installationId: ctx.get("X-Installation-ID") || null,
    sessionId: ctx.get("X-Session-ID") || uuidv4(),
  };

  await next();
};
