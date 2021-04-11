import { NextFunction, Request, Response } from "express";
import { provider } from "../repositories";

class ProviderController {
  public async getProviders(_req: Request, res: Response, next: NextFunction) {
    try {
      const _providers = await provider.getProviders();

      res.json(_providers);
    } catch (err) {
      next(err);
    }
  }
}

export const providerController = new ProviderController();
