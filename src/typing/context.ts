import { Logger } from "@lindorm-io/winston";
import { Request } from "koa";
import { RouterContext } from "koa-router";
import { AuthorizationHeader } from "../util";

interface KoaAgent {
  browser: string;
  geoIp: Record<string, unknown>;
  os: string;
  platform: string;
  source: string;
  version: string;
}

interface KoaMetadataHeaders {
  "X-Client-Environment": string | null;
  "X-Client-ID": string | null;
  "X-Client-Name": string | null;
  "X-Client-Platform": string | null;
  "X-Client-Version": string | null;
  "X-Correlation-ID": string | null;
  "X-Device-ID": string | null;
  "X-Installation-ID": string | null;
  "X-Session-ID": string | null;
}

interface KoaMetadata {
  clientEnvironment: string | null;
  clientId: string | null;
  clientName: string | null;
  clientPlatform: string | null;
  clientVersion: string | null;
  correlationId: string | null;
  deviceId: string | null;
  installationId: string | null;
  sessionId: string | null;
}

type DefaultBody = Record<string, any>;

interface KoaRequest<Body extends DefaultBody> extends Request {
  body: Body;
}

export interface KoaContext<Body extends DefaultBody = DefaultBody> extends RouterContext {
  agent: KoaAgent;
  client: unknown;
  controller: unknown;
  entity: unknown;
  handler: unknown;
  io: unknown;
  jwt: unknown;
  logger: Logger;
  metadata: KoaMetadata;
  metadataHeaders: KoaMetadataHeaders;
  metrics: Record<string, number>;
  request: KoaRequest<Body>;
  token: unknown;

  getAuthorization(): AuthorizationHeader;
}
