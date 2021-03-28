import { ParameterizedContext } from "koa";
import { Logger } from "@lindorm-io/winston";
import { IRouterParamContext } from "koa-router";

export type TNext = () => Promise<void>

export interface IKoaAppAgent {
  browser: string;
  geoIp: Record<string, unknown>;
  os: string;
  platform: string;
  source: string;
  version: string;
}

export interface IKoaAppMetadata {
  clientId: string;
  clientEnvironment: string;
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
