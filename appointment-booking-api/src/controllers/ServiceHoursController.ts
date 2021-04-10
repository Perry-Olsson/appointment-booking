import { NextFunction, Request, Response } from "express";
import { serviceHours } from "../repositories";

class ServiceHoursController {
  async getServiceHours(_req: Request, res: Response, next: NextFunction) {
    try {
      const _serviceHours = await serviceHours.getServiceHours();

      res.json(_serviceHours);
    } catch (err) {
      next(err);
    }
  }
}

export const serviceHoursController = new ServiceHoursController();
