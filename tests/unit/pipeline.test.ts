import { Pipeline } from "../../src/pipeline";

describe("Pipeline", () => {
  it("should construct", () => {
    const pipeline = new Pipeline<string, string>([]);
    
    expect(pipeline).not.toBeNull();
  });

  it("should construct with middlewares", () => {
    const basicMiddleware = {
      exec: jest.fn((req, next) => "this is a test"),
    };
    const nextMiddleware = {
      exec: jest.fn((req, next) => next("next") ?? "no next"),
    };

    const middlewares = [basicMiddleware, nextMiddleware];
    const pipeline = new Pipeline<string, string>(middlewares);

    expect(pipeline).not.toBeNull();
  });

  it("should construct with promises", () => {
    const basicAsyncMiddleware = {
      exec: jest.fn(async (req, next) => "this is a test"),
    };
    const requestAsyncMiddleware = {
      exec: jest.fn(async (req, next) => req),
    };

    const middlewares = [basicAsyncMiddleware, requestAsyncMiddleware];
    const pipeline = new Pipeline<string, Promise<string>>(middlewares);

    expect(pipeline).not.toBeNull();
  });

  describe("exec", () => {
    it("should run with basic middleware", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };

      const middlewares = [basicMiddleware];
      const pipeline = new Pipeline<string, string>(middlewares);
      const result = pipeline.exec("test");

      expect(result).toBe("this is a test");
      expect(basicMiddleware.exec).toBeCalled();
    });

    it("should execute middlewares sequentially", () => {
      const nextMiddleware = {
        exec: jest.fn((req, next) => next("next") ?? "no next"),
      };
      const requestMiddleware = {
        exec: jest.fn((req, next) => req),
      };

      const middlewares = [nextMiddleware, requestMiddleware];
      const pipeline = new Pipeline<string, string>(middlewares);
      const result = pipeline.exec("any");

      expect(result).toBe("next");
      expect(nextMiddleware.exec).toBeCalled();
      expect(requestMiddleware.exec).toBeCalled();
    });

    it("can be aborted early if next is not used", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };
      const requestMiddleware = {
        exec: jest.fn((req, next) => req),
      };

      const middlewares = [requestMiddleware, basicMiddleware];
      const pipeline = new Pipeline<string, string>(middlewares);
      const result = pipeline.exec("whatever");

      expect(result).toBe("whatever");
      expect(requestMiddleware.exec).toBeCalled();
      expect(basicMiddleware.exec).not.toBeCalled();
    });

    it("should abort on error", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };
      const errorMiddleware = {
        exec: jest.fn((req, next) => {
          throw new Error("this is an error");
        }),
      };

      const middlewares = [errorMiddleware, basicMiddleware];
      const pipeline = new Pipeline<string, string>(middlewares);
      expect(() => pipeline.exec("whatever")).toThrow("this is an error");
      expect(errorMiddleware.exec).toBeCalled();
      expect(basicMiddleware.exec).not.toBeCalled();
    });

    it("should return undefined on last next", () => {
      const nextMiddleware = {
        exec: jest.fn((req, next) => next("next") ?? "no next"),
      };

      const middlewares = [nextMiddleware];
      const pipeline = new Pipeline<string, string>(middlewares);
      const result = pipeline.exec("lorem ipsum");

      expect(result).toBe("no next");
    });
  });

  describe("exec with async", () => {
    it("should run with basic middleware", () => {
      const basicAsyncMiddleware = {
        exec: jest.fn(async (req, next) => "this is a test"),
      };

      const middlewares = [basicAsyncMiddleware];
      const pipeline = new Pipeline<string, Promise<string>>(middlewares);
      const result = pipeline.exec("test");

      expect(result).resolves.toBe("this is a test");
      expect(basicAsyncMiddleware.exec).toBeCalled();
    });

    it("should execute middlewares sequentially", () => {
      const nextAsyncMiddleware = {
        exec: jest.fn(async (req, next) => next("next") ?? "no next"),
      };
      const requestAsyncMiddleware = {
        exec: jest.fn(async (req, next) => req),
      };

      const middlewares = [nextAsyncMiddleware, requestAsyncMiddleware];
      const pipeline = new Pipeline<string, Promise<string>>(middlewares);
      const result = pipeline.exec("any");

      expect(result).resolves.toBe("next");
      expect(nextAsyncMiddleware.exec).toBeCalled();
      expect(requestAsyncMiddleware.exec).toBeCalled();
    });

    it("can be aborted early if next is not used", () => {
      const basicAsyncMiddleware = {
        exec: jest.fn(async (req, next) => "this is a test"),
      };
      const requestAsyncMiddleware = {
        exec: jest.fn(async (req, next) => req),
      };

      const middlewares = [requestAsyncMiddleware, basicAsyncMiddleware];
      const pipeline = new Pipeline<string, Promise<string>>(middlewares);
      const result = pipeline.exec("whatever");

      expect(result).resolves.toBe("whatever");
      expect(requestAsyncMiddleware.exec).toBeCalled();
      expect(basicAsyncMiddleware.exec).not.toBeCalled();
    });

    it("should abort on error", () => {
      const basicAsyncMiddleware = {
        exec: jest.fn(async (req, next) => "this is a test"),
      };
      const errorAsyncMiddleware = {
        exec: jest.fn(async (req, next) => {
          throw new Error("this is an error");
        }),
      };

      const middlewares = [errorAsyncMiddleware, basicAsyncMiddleware];
      const pipeline = new Pipeline<string, Promise<string>>(middlewares);
      const result = pipeline.exec("whatever");

      expect(result).rejects.toThrow("this is an error");
      expect(middlewares[0].exec).toBeCalled();
      expect(middlewares[1].exec).not.toBeCalled();
    });

    it("should return undefined on last next", () => {
      const nextAsyncMiddleware = {
        exec: jest.fn(async (req, next) => next("next") ?? "no next"),
      };

      const middlewares = [nextAsyncMiddleware];
      const pipeline = new Pipeline<string, Promise<string>>(middlewares);
      const result = pipeline.exec("lorem ipsum");
      
      expect(result).resolves.toBe("no next");
    });
  });
});
