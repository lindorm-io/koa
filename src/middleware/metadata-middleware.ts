import { IKoaAppContext, TNext } from "../typing";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

interface IKoaMetadataMiddleware extends IKoaAppContext {
  userAgent: Record<string, any>;
}

export const metadataMiddleware = async (ctx: IKoaMetadataMiddleware, next: TNext): Promise<void> => {
  ctx.agent = {
    ...(ctx.agent || {}),
    browser: ctx.userAgent?.browser || null,
    geoIp: ctx.userAgent?.geoIp || null,
    os: ctx.userAgent?.os || null,
    platform: ctx.userAgent?.platform || null,
    source: ctx.userAgent?.source || null,
    version: ctx.userAgent?.version || null,
  };

  ctx.metadata = {
    ...(ctx.metadata || {}),
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
