import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "./logger";

export const requestLogger: MiddlewareFn = (req, _, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Query: ", req.query);
  logger.info("Body: ", req.body);
  logger.info("--------------------");
  next();
};

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
  } else if (error.name === "InvalidTimeError") {
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  }

  next(error);
};

export const unknownEndpoint: MiddlewareFn = (_, res, next) => {
  res.status(404).json({
    error: "Unknown endpoint",
  });
  next();
};

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;
