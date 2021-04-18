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
  "X-Client-Environment": string;
  "X-Client-ID": string;
  "X-Client-Name": string;
  "X-Client-Platform": string;
  "X-Client-Version": string;
  "X-Correlation-ID": string;
  "X-Device-ID": string;
  "X-Installation-ID": string;
  "X-Session-ID": string;
}

export interface IKoaAppMetadata {
  clientEnvironment: string;
  clientId: string;
  clientName: string;
  clientPlatform: string;
  clientVersion: string;
  correlationId: string;
  deviceId: string;
  installationId: string;
  sessionId: string;
}

export interface IKoaAppContext extends ParameterizedContext<any, IRouterParamContext<any, Record<any, unknown>>> {
  agent: IKoaAppAgent;
  cache: unknown;
  controller: unknown;
  handler: unknown;
  issuer: unknown;
  keystore: unknown;
  logger: Logger;
  metadata: IKoaAppMetadata;
  metrics: Record<string, number>;
  repository: unknown;
  token: unknown;
}
