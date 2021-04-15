import { NextFunction, Request, Response } from "express";
import { ProviderDataAccess } from "../repositories";

class ProviderController {
  private dataAccess: ProviderDataAccess;

  constructor(dataAccess: ProviderDataAccess) {
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

export const providerController = new ProviderController(
  new ProviderDataAccess()
);
