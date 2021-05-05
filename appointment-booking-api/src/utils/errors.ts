export class ExpectedError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
  }
}

export class DuplicateError extends ExpectedError {
  constructor(resource: string, message: string) {
    super(message);
    this.name = `duplicate${resource}`;
  }
}

export class TimeError extends ExpectedError {
  constructor(
    message = "Appointments must be scheduled and end at quarter hours"
  ) {
    super(message);
    this.name = "invalidTime";
  }
}

export class TimestampError extends ExpectedError {
  constructor(timestamp: any) {
    super(
      `timestamp ${timestamp} is invalid. Timestamp must be in json format`
    );
    this.name = "invalidTimestamp";
  }
}

export class EmailError extends ExpectedError {
  constructor(email: any) {
    super(`email "${email}" is not a valid email`);

    this.name = "invalidEmail";
  }
}

export class LoginError extends ExpectedError {
  constructor() {
    super("Invalid email or password");

    this.name = "invalidLogin";
  }
}

export class QueryError extends ExpectedError {
  constructor() {
    super(
      "Appointments query string must contain a 'start' and 'finish' field"
    );
    this.name = "invalidQuery";
  }
}

export class BoundryError extends ExpectedError {
  constructor() {
    super("The 'start' and 'end' queries must be valid numbers");

    this.name = "invalidBoundry";
  }
}

export class NotAuthenticatedError extends ExpectedError {
  constructor(status: number) {
    super("User has not been authenticated", status);

    this.name = "notAuthenticated";
  }
}

//not implemented in error handler yet
export class AccessRevokedError extends ExpectedError {
  constructor(status: number) {
    super("Access to use this service has been revoked", status);

    this.name = "accessRevoked";
  }
}

export class TokenInvalidatedError extends ExpectedError {
  constructor() {
    super("Your session has been invalidated. Try logging in again", 403);

    this.name = "tokenInvalidated";
  }
}

export class UserNotFoundError extends ExpectedError {
  constructor(message: string, status: number) {
    super(message, status);

    this.name = "userNotFound";
  }
}

export class EmailInUseError extends ExpectedError {
  constructor() {
    super("An account is already associated with this email address", 200);

    this.name = "emailInUse";
  }
}
