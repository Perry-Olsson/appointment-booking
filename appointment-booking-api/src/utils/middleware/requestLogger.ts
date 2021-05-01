import logger from "../logger";
import { MiddlewareFn } from "./types";

export const requestLogger: MiddlewareFn = (req, _, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Query: ", req.query);
  logger.info("Body: ", req.body);
  logger.info("Headers: ", req.headers);
  logger.info("--------------------");
  next();
};
