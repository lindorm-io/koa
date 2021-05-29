import { IRouterParamContext } from "koa-router";
import { Logger } from "@lindorm-io/winston";
import { ParameterizedContext } from "koa";

export interface IKoaAppAgent {
  browser: string;
  geoIp: Record<string, unknown>;
  os: string;
  platform: string;
  source: string;
  version: string;
}

export interface IKoaAppMetadataHeaders {
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

export interface IKoaAppMetadata {
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

export interface IKoaAppContext extends ParameterizedContext<any, IRouterParamContext<any, Record<any, unknown>>> {
  agent: IKoaAppAgent;
  cache: unknown;
  client: unknown;
  controller: unknown;
  entity: unknown;
  handler: unknown;
  issuer: unknown;
  keystore: unknown;
  logger: Logger;
  metadata: IKoaAppMetadata;
  metadataHeaders: IKoaAppMetadataHeaders;
  metrics: Record<string, number>;
  repository: unknown;
  token: unknown;
}
