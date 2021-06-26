import { KoaContext, Middleware } from "../../typing";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { Environment } from "../../enum";

export const metadataMiddleware: Middleware<KoaContext> = async (ctx, next): Promise<void> => {
  ctx.metadata = {
    clientEnvironment: (ctx.get("X-Client-Environment") as Environment) || null,
    clientId: ctx.get("X-Client-ID") || null,
    clientPlatform: ctx.get("X-Client-Platform") || null,
    clientVersion: ctx.get("X-Client-Version") || null,
    correlationId: ctx.get("X-Correlation-ID") || uuidv1(),
    deviceId: ctx.get("X-Device-ID") || null,
    deviceUniqueId: ctx.get("X-Device-Unique-ID") || null,
    installationId: ctx.get("X-Installation-ID") || null,
    sessionId: ctx.get("X-Session-ID") || uuidv4(),
  };

  ctx.metadataHeaders = {
    "X-Client-Environment": ctx.metadata.clientEnvironment,
    "X-Client-ID": ctx.metadata.clientId,
    "X-Client-Platform": ctx.metadata.clientPlatform,
    "X-Client-Version": ctx.metadata.clientVersion,
    "X-Correlation-ID": ctx.metadata.correlationId,
    "X-Device-ID": ctx.metadata.deviceId,
    "X-Device-Unique-ID": ctx.metadata.deviceUniqueId,
    "X-Installation-ID": ctx.metadata.installationId,
    "X-Session-ID": ctx.metadata.sessionId,
  };

  await next();
};
