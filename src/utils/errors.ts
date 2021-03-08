export class DuplicateError extends Error {
  constructor(resource: string, message: string) {
    super(message);
    this.name = `Duplicate ${resource}`;
  }
}

export class InvalidTimeError extends Error {
  constructor(
    message = "Appointments must be scheduled on the hour or half hour"
  ) {
    super(message);
    this.name = "Invalid time";
  }
}

export class InvalidTimestampError extends Error {
  constructor(timestamp: string) {
    super(
      `timestamp ${timestamp} is invalid. Timestamp must be in json format`
    );
    this.name = "Invalid timestamp";
  }
}
