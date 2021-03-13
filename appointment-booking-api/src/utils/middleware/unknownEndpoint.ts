import { MiddlewareFn } from "./types";

export const unknownEndpoint: MiddlewareFn = (_, res, next) => {
  res.status(404).json({
    error: "Unknown endpoint",
  });
  next();
};
