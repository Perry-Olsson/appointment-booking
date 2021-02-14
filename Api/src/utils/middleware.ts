import { NextFunction, Request } from "express";
import logger from "./logger";

export const requestLogger = (req: Request, _: any, next: NextFunction) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Query: ", req.query);
  logger.info("Body: ", req.body);
  logger.info("--------------------");
  next();
};
