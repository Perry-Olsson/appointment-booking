import { NextFunction, Request, Response } from "express";
import { ServiceHoursDAO } from "./types";

export class ServiceHoursController {
  private dataAccess: ServiceHoursDAO;

  constructor(dataAccess: ServiceHoursDAO) {
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
