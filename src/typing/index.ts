import { IRouterParamContext } from "koa-router";
import { Logger } from "@lindorm-io/winston";
import { ParameterizedContext } from "koa";

export type TNext = () => Promise<void>;

export interface IKoaAppAgent {
  browser: string;
  geoIp: Record<string, unknown>;
  os: string;
  platform: string;
  source: string;
  version: string;
}

export interface IKoaAppMetaHeaders {
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
  metadata: IKoaAppMetadata;
  metrics: Record<string, number>;
  logger: Logger;
}
