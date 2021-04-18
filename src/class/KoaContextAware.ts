import { IKoaAppAgent, IKoaAppContext, IKoaAppMetadata } from "../typing";
import { Logger } from "@lindorm-io/winston";

export abstract class KoaContextAware {
  protected agent: IKoaAppAgent;
  protected cache: unknown;
  protected client: unknown;
  protected entity: unknown;
  protected handler: unknown;
  protected issuer: unknown;
  protected keystore: unknown;
  protected logger: Logger;
  protected metadata: IKoaAppMetadata;
  protected metrics: Record<string, number>;
  protected repository: unknown;
  protected token: unknown;

  constructor(ctx: IKoaAppContext) {
    this.agent = ctx.agent;
    this.cache = ctx.cache;
    this.client = ctx.client;
    this.entity = ctx.entity;
    this.handler = ctx.handler;
    this.issuer = ctx.issuer;
    this.keystore = ctx.keystore;
    this.logger = ctx.logger;
    this.metadata = ctx.metadata;
    this.metrics = ctx.metrics;
    this.repository = ctx.repository;
    this.token = ctx.token;
  }
}
