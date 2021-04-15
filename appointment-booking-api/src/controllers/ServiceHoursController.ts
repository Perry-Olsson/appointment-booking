import { NextFunction, Request, Response } from "express";
import { ServiceHoursDataAccess } from "../repositories";

class ServiceHoursController {
  private dataAccess: ServiceHoursDataAccess;

  constructor(dataAccess: ServiceHoursDataAccess) {
    this.dataAccess = dataAccess;
  }

  async getServiceHours(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.dataAccess.getServiceHours());
    } catch (err) {
      next(err);
    }
  }
}

export const serviceHoursController = new ServiceHoursController(
  new ServiceHoursDataAccess()
);
