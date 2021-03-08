import { ErrorRequestHandler } from "express";
import config from "../../config";
import logger from "../logger";

export const errorHandler: ErrorRequestHandler = (error, _, res, next) => {
  if (config.env !== "production")
    logger.error("--------------\n", error.message, "\n--------------");

  switch (error.name) {
    case "Duplicate appointment":
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    case "Invalid time":
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    case "Invalid timestamp":
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
  }

  return next(error);
};
