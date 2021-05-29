import { IKoaAppContext } from "../typing";

export abstract class KoaContextAware {
  protected readonly ctx: IKoaAppContext;

  public constructor(ctx: IKoaAppContext) {
    this.ctx = ctx;
  }
}
