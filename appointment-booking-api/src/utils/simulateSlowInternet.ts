import { NextFunction, Request, Response } from "express";

export const simulateSlowInternet = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });
  next();
};
