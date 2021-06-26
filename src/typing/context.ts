import { AuthorizationHeader } from "./util";
import { Environment } from "../enum";
import { Logger } from "@lindorm-io/winston";
import { Metric } from "../class";
import { Request, Response } from "koa";
import { RouterContext } from "koa-router";

interface KoaAgent {
  browser: string;
  geoIp: Record<string, unknown>;
  os: string;
  platform: string;
  source: string;
  version: string;
}

interface KoaMetadataHeaders {
  "X-Client-ID": string | null;
  "X-Client-Environment": Environment | null;
  "X-Client-Platform": string | null;
  "X-Client-Version": string | null;
  "X-Correlation-ID": string | null;
  "X-Device-ID": string | null;
  "X-Device-Unique-ID": string | null;
  "X-Installation-ID": string | null;
  "X-Session-ID": string | null;
}

interface KoaMetadata {
  clientId: string | null;
  clientEnvironment: Environment | null;
  clientPlatform: string | null;
  clientVersion: string | null;
  correlationId: string | null;
  deviceId: string | null;
  deviceUniqueId: string | null;
  installationId: string | null;
  sessionId: string | null;
}

interface KoaRequest<Body extends Record<string, any>> extends Request {
  body: Body;
}

interface KoaResponse<Body> extends Response {
  body: Body;
}

export interface KoaContext<
  RequestBody extends Record<string, string> = Record<string, any>,
  RequestParams extends Record<string, string> = Record<string, string>,
  ResponseBody = any,
> extends RouterContext {
  agent: KoaAgent;
  axios: Record<string, unknown>;
  cache: Record<string, unknown>;
  client: Record<string, unknown>;
  entity: Record<string, unknown>;
  jwt: unknown;
  keys: Array<unknown>;
  keystore: unknown;
  logger: Logger;
  metadata: KoaMetadata;
  metadataHeaders: KoaMetadataHeaders;
  metrics: Record<string, number>;
  repository: unknown;
  token: Record<string, unknown>;

  params: RequestParams;
  request: KoaRequest<RequestBody>;
  response: KoaResponse<ResponseBody>;
  body: ResponseBody;

  getAuthorization(): AuthorizationHeader;
  getMetric(key: string): Metric;
}
