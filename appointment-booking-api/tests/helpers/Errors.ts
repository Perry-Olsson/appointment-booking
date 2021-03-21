export class PushToDbError extends Error {
  constructor() {
    super("appointments won't be null if pushToDb is true");
  }
}
