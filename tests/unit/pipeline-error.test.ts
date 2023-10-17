import { PipelineError } from "../../src/pipeline-error";

describe("PipelineError", () => {
  it("should be an error", () => {
    const pipelineError = new PipelineError("test");
    expect(pipelineError).toBeInstanceOf(Error);
  });

  it("should throw", () => {
    const pipelineError = new PipelineError("test");
    expect(() => {
      throw pipelineError;
    }).toThrow("test");
  });
});
