import { NextFunction, Request, Response } from "express";
import { appointment } from "../repositories";
import { TimeBoundry } from "../repositories/appointment/types";
import { NewAppointment } from "../types";
import { TimestampValidator } from "../utils";

class AppointmentController extends TimestampValidator {
  async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedQuery = this.validateQuery(req.query);
      const appointments = await appointment.findMany(parsedQuery);

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

  async getOneAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const validTimestamp = this.validateJSONTimestamp(req.params.timestamp);
      const _appointment = await appointment.findUnique(validTimestamp);

      res.json(_appointment);
    } catch (err) {
      next(err);
    }
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const newAppointment = this.initialize(req.body);

      await appointment.isDuplicate(newAppointment);

      const createdAppointment = await appointment.create(newAppointment);

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

export const appointmentController = new AppointmentController();
