import { ErrorRequestHandler } from "express";
import config from "../../config";
import logger from "../logger";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _,
  res,
  next
) => {
  if (config.env !== "production")
    logger.error("--------------\n", error.message, "\n--------------");

  if (!errorResponses[error.name]) return next(error);

  return res.status(400).json(errorResponses[error.name](error.message));
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
};

interface ErrorResponseObject {
  [key: string]: (message: string) => ErrorResponse;
}

interface ErrorResponse {
  error: string;
  message: string;
}
