import Timeout = NodeJS.Timeout;
import { EventEmitter } from "events";
import { Logger } from "@lindorm-io/winston";
import { TObject, TPromise } from "@lindorm-io/global";

export interface IIntervalWorkerOptions {
  callback: TPromise<any>;
  time: number;
  logger: Logger;
}

enum IntervalWorkerEvent {
  START = "INTERVAL_WORKER_START",
  STOP = "INTERVAL_WORKER_STOP",
  SUCCESS = "INTERVAL_WORKER_SUCCESS",
  ERROR = "INTERVAL_WORKER_ERROR",
}

export class IntervalWorker extends EventEmitter {
  private callback: TPromise<any>;
  private interval: Timeout;
  private logger: Logger;
  private time: number;

  constructor(options: IIntervalWorkerOptions) {
    super();

    this.callback = options.callback;
    this.interval = undefined;
    this.time = options.time;

    this.logger = options.logger.createChildLogger("interval-worker");
  }

  public trigger(): void {
    this.logger.info("worker trigger");
    this.callback()
      .then((result: any) => {
        this.logger.debug("worker success", { result });
        super.emit(IntervalWorkerEvent.SUCCESS, { result });
      })
      .catch((err: Error) => {
        this.logger.error("worker error", err);
        super.emit(IntervalWorkerEvent.ERROR, err);
      });
  }

  public start(): void {
    this.logger.info("worker start", { intervalMs: this.time });
    this.interval = setInterval(() => this.trigger(), this.time);
    super.emit(IntervalWorkerEvent.START);
  }

  public stop(): void {
    this.logger.info("worker stop");
    clearInterval(this.interval);
    this.interval = undefined;
    super.emit(IntervalWorkerEvent.STOP);
  }

  public static get Event(): TObject<IntervalWorkerEvent> {
    return IntervalWorkerEvent;
  }
}
