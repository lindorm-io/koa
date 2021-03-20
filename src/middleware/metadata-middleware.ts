import { IKoaAppContext } from "../typing";
import { TPromise } from "@lindorm-io/core";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export const metadataMiddleware = async (ctx: IKoaAppContext, next: TPromise<void>): Promise<void> => {
  ctx.metadata = {
    ...(ctx.metadata || {}),
    clientId: ctx.get("X-Client-ID") || null,
    clientEnvironment: ctx.get("X-Client-Environment") || null,
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
