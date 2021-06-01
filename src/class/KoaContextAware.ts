import type { KoaContext } from "../typing";

export abstract class KoaContextAware {
  protected readonly ctx: KoaContext;

  public constructor(ctx: KoaContext) {
    this.ctx = ctx;
  }
}
