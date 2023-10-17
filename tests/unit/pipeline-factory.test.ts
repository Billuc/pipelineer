import { Pipeline } from "../../src/pipeline";
import { PipelineFactory } from "../../src/pipeline-factory";

describe("PipelineFactory", () => {
  it("should construct", () => {
    const factory = new PipelineFactory<string, string>();

    expect(factory).not.toBeNull();
  });

  it("should construct with promises", () => {
    const factory = new PipelineFactory<string, Promise<string>>();

    expect(factory).not.toBeNull();
  });

  describe("push", () => {
    it("can be called with a middleware", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };
      const factory = new PipelineFactory<string, string>();

      factory.push(basicMiddleware);
    });

    it("should return the number of middleware", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is another test"),
      };
      const nextMiddleware = {
        exec: jest.fn((req, next) => next(req)),
      };
      const factory = new PipelineFactory<string, string>();

      const firstPush = factory.push(basicMiddleware);
      const secondPush = factory.push(nextMiddleware);
      const thirdPush = factory.push(basicMiddleware);

      expect(firstPush).toBe(1);
      expect(secondPush).toBe(2);
      expect(thirdPush).toBe(3);
    });
  });

  describe("unshift", () => {
    it("can be called with a middleware", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };
      const factory = new PipelineFactory<string, string>();

      factory.unshift(basicMiddleware);
    });

    it("should return the number of middleware", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is another test"),
      };
      const nextMiddleware = {
        exec: jest.fn((req, next) => next(req)),
      };
      const factory = new PipelineFactory<string, string>();

      const firstUnshift = factory.unshift(basicMiddleware);
      const secondUnshift = factory.unshift(nextMiddleware);
      const thirdUnshift = factory.unshift(basicMiddleware);

      expect(firstUnshift).toBe(1);
      expect(secondUnshift).toBe(2);
      expect(thirdUnshift).toBe(3);
    });
  });

  describe("build", () => {
    it("should throw if there is no middleware", () => {
      const factory = new PipelineFactory<string, string>();

      expect(() => factory.build()).toThrow(
        "Cannot build a pipeline with 0 middlewares"
      );
    });

    it("should return a Pipeline", () => {
      const basicMiddleware = {
        exec: jest.fn((req, next) => "this is a test"),
      };
      const factory = new PipelineFactory<string, string>();

      factory.push(basicMiddleware);
      const pipeline = factory.build();

      expect(pipeline).toBeInstanceOf(Pipeline);
    });
  });
});
