export class PipelineError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PipelineError.prototype);
  }
}