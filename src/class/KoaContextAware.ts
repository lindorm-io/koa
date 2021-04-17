import { IKoaAppAgent, IKoaAppContext, IKoaAppMetadata } from "../typing";
import { Logger } from "@lindorm-io/winston";

export abstract class KoaContextAware {
  protected agent: IKoaAppAgent;
  protected cache: Record<string, unknown>;
  protected handler: Record<string, unknown>;
  protected issuer: Record<string, unknown>;
  protected keystore: Record<string, unknown>;
  protected logger: Logger;
  protected metadata: IKoaAppMetadata;
  protected metrics: Record<string, number>;
  protected repository: Record<string, unknown>;
  protected support: Record<string, unknown>;
  protected token: Record<string, unknown>;

  constructor(ctx: IKoaAppContext) {
    this.agent = ctx.agent;
    this.cache = ctx.cache;
    this.handler = ctx.handler;
    this.issuer = ctx.issuer;
    this.keystore = ctx.keystore;
    this.logger = ctx.logger;
    this.metadata = ctx.metadata;
    this.metrics = ctx.metrics;
    this.repository = ctx.repository;
    this.support = ctx.support;
    this.token = ctx.token;
  }
}
