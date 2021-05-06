import { ErrorRequestHandler } from "express";
import { ExpectedError } from "..";
import config from "../../config";
import logger from "../logger";

export const errorHandler: ErrorRequestHandler = (
  error: ExpectedError,
  _,
  res,
  next
) => {
  if (config.logError)
    logger.error("--------------\n", error.message, "\n--------------");

  if (!errorResponses[error.name]) return next(error);

  return res
    .status(error.status)
    .json(errorResponses[error.name](error.message));
};

const errorResponses: ErrorResponseObject = {
  duplicateAppointment: (message: string) => ({
    error: "Duplicate appointment",
    message,
  }),
  invalidTime: (message: string) => ({
    error: "Invalid time",
    message,
  }),
  invalidTimestamp: (message: string) => ({
    error: "Invalid timestamp",
    message,
  }),
  invalidLogin: (message: string) => ({
    error: "Invalid Login",
    message,
  }),
  invalidEmail: (message: string) => ({
    error: "Invalid email",
    message,
  }),
  notAuthenticated: (message: string) => ({
    error: "Not authenticated",
    message,
  }),
  tokenNotFound: (message: string) => ({
    error: "Token not found",
    message,
  }),
  JsonWebTokenError: (message: string) => ({
    error: "JsonWebTokenError",
    message,
  }),
  userNotFound: (message: string) => ({
    error: "User not found",
    message,
  }),
  tokenInvalidated: (message: string) => ({
    error: "Token invalidated",
    message,
  }),
  emailInUse: (message: string) => ({
    error: "Email in use",
    message,
  }),
  appointmentConflicts: (message: string) => ({
    error: "Provider unavailable",
    message,
  }),
};

interface ErrorResponseObject {
  [key: string]: (message: string) => ErrorResponse;
}

interface ErrorResponse {
  error: string;
  message: string;
}
