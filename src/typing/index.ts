import { ParameterizedContext } from "koa";
import { Logger } from "@lindorm-io/winston";
import { TObject } from "@lindorm-io/core";
import { IRouterParamContext } from "koa-router";

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
  metadata: IKoaAppMetadata;
  metrics: TObject<number>;
  logger: Logger;
}
