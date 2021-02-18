export class DuplicateError extends Error {
  constructor(resource: string, message: string) {
    super(message);
    this.name = `Duplicate ${resource}`;
  }
}
