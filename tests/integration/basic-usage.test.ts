import { PipelineFactory } from "../../src/pipeline-factory";

describe("Basic Usage", () => {
  it("should run", () => {
    const prefixer = {
      exec: jest.fn((req, next) => "before-" + (next(req) ?? req)),
    };
    const suffixer = {
      exec: jest.fn((req, next) => (next(req) ?? req) + "-after"),
    };
    const inverter = {
      exec: jest.fn((req: string, next) => req.split("").reverse().join("")),
    };

    const factory = new PipelineFactory<string, string>();
    factory.push(prefixer);
    factory.push(suffixer);
    factory.push(inverter);
    const pipeline = factory.build();

    const result = pipeline.exec("elddim");

    expect(result).toBe("before-middle-after");
    expect(prefixer.exec).toBeCalled();
    expect(suffixer.exec).toBeCalled();
    expect(inverter.exec).toBeCalled();
  });
});
