import { IKoaAppContext } from "../typing";

export abstract class KoaContextAware {
  protected ctx: IKoaAppContext;

  constructor(ctx: IKoaAppContext) {
    this.ctx = ctx;
  }
}
