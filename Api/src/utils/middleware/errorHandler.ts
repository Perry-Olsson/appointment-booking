import { ErrorRequestHandler } from "express";
import logger from "../logger";

export const errorHandler: ErrorRequestHandler = (
  error,
  _,
  res,
  next
): void => {
  logger.error("--------------\n", error.message, "\n--------------");

  if (error.name === "Duplicate appointment") {
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  } else if (error.name === "Invalid time") {
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  } else if (error.name === "Invalid timestamp") {
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  }

  next(error);
};
