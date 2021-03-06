import { NextFunction, Request, Response } from "express";
import { TimeBoundry } from "../repositories/appointment/types";
import { NewAppointment } from "../types";
import { TimestampValidator } from "../utils";
import { AppointmentDAO } from "./types";

export class AppointmentController extends TimestampValidator {
  private dataAccess: AppointmentDAO;

  constructor(dataAccess: AppointmentDAO) {
    super();
    this.dataAccess = dataAccess;
  }
  async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedQuery = this.validateQuery(req.query);
      const appointments = await this.dataAccess.getAppointments(parsedQuery);

      res.json(appointments);
    } catch (err) {
      next(err);
    }
  }

  public validateQuery(query?: any): TimeBoundry {
    if (!query || query.start === undefined || query.end === undefined)
      return { hasQueryString: false, start: 0, end: 0 };

    const start = this.validateTimeString(query.start);
    const end = this.validateTimeString(query.end);

    return { hasQueryString: true, start, end };
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const newAppointment = this.initialize(req.body);

      await this.dataAccess.isDuplicate(newAppointment);

      await this.dataAccess.isConflicting(newAppointment);

      const createdAppointment = await this.dataAccess.create(newAppointment);

      res.json(createdAppointment);
    } catch (err) {
      next(err);
    }
  }

  public initialize(reqBody: any): NewAppointment {
    const newAppointment = this._validateNewAppointment(reqBody);

    this.validateTime(newAppointment);

    return newAppointment;
  }

  private _validateNewAppointment(reqBody: any): NewAppointment {
    const timestamp = this.validateJSONTimestamp(reqBody.timestamp);
    const end = this.validateJSONTimestamp(reqBody.end);

    return { ...reqBody, timestamp, end };
  }
}
