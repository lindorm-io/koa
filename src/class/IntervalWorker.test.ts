import { IntervalWorker } from "./IntervalWorker";

const sleep = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

describe("IntervalWorker.ts", () => {
  let eventResult: any;
  let worker: IntervalWorker;

  let mockLogger: any;
  let callback: any;

  beforeEach(() => {
    eventResult = {};
    mockLogger = {
      createChildLogger: () => ({
        debug: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
      }),
    };
    callback = jest.fn().mockResolvedValue("mock-success");

    worker = new IntervalWorker({
      logger: mockLogger,
      callback,
      time: 5,
    });
    worker.on(IntervalWorker.Event.START, () => {
      eventResult.start = true;
    });
    worker.on(IntervalWorker.Event.STOP, () => {
      eventResult.stop = true;
    });
    worker.on(IntervalWorker.Event.SUCCESS, () => {
      eventResult.success = true;
      worker.stop();
    });
    worker.on(IntervalWorker.Event.ERROR, () => {
      eventResult.error = true;
      worker.stop();
    });
  });

  test("should run callback", async () => {
    worker.trigger();
    await sleep(10);

    expect(callback).toHaveBeenCalled();
    expect(eventResult).toStrictEqual({
      success: true,
      stop: true,
    });
  });

  test("should start and eventually run callback", async () => {
    worker.start();
    await sleep(10);

    expect(callback).toHaveBeenCalled();
    expect(eventResult).toStrictEqual({
      start: true,
      stop: true,
      success: true,
    });
  });

  test("should not have run callback", async () => {
    worker.start();

    expect(callback).not.toHaveBeenCalled();
  });
});
