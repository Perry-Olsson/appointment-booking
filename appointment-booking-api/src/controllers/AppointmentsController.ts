import { NextFunction, Request, Response } from "express";
import { appointment } from "../repositories";

class AppointmentController {
  async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await appointment.findMany(req);

      res.json(appointments);
    } catch (err) {
      next(err);
    }
  }

  async getOneAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const _appointment = await appointment.findUnique(req);

      res.json(_appointment);
    } catch (err) {
      next(err);
    }
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const newAppointment = appointment.initialize(req.body);

      await appointment.isDuplicate(newAppointment);

      const createdAppointment = await appointment.create(newAppointment);

      res.json(createdAppointment);
    } catch (err) {
      next(err);
    }
  }
}

export const appointmentController = new AppointmentController();
