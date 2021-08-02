import { NextFunction, Request, Response } from "express";
import { ProviderDAO } from "./types";

export class ProviderController {
  private dataAccess: ProviderDAO;

  constructor(dataAccess: ProviderDAO) {
    this.dataAccess = dataAccess;
  }

  public async getProviders(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.dataAccess.getProviders());
    } catch (err) {
      next(err);
    }
  }
}
