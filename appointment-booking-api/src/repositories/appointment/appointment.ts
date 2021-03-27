import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import {
  initialize,
  exposed,
  validateQuery,
  isDuplicate,
  validateNewAppointment,
  validateTimestamp,
  validateTime,
  findManyRaw,
} from "./mixins";
import { NewAppointment } from "../../types";
import { DuplicateError, TimestampError } from "../../utils";
import { Appointment } from "@prisma/client";
import { Request } from "express";

const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize,
  isDuplicate,
  validateNewAppointment,
  validateTimestamp,
  validateTime,
  exposed,
  findManyRaw,
};

const appointment: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { appointment };

class _Appointment {
  public initialize(reqBody: any): NewAppointment {
    const newAppointment = this._validateNewAppointment(reqBody);

    appointment.validateTime(newAppointment);

    return newAppointment;
  }

  private _validateNewAppointment(reqBody: any): NewAppointment {
    const timestamp = this._validateTimestamp(reqBody.timestamp);
    const end = this._validateTimestamp(reqBody.end);

    return { ...reqBody, timestamp, end };
  }

  private _validateTimestamp(timestamp: any): Date {
    if (
      typeof timestamp !== "string" ||
      timestamp.length !== 24 ||
      isNaN(Date.parse(timestamp))
    )
      throw new TimestampError(timestamp);
    return new Date(timestamp);
  }

  public async isDuplicate({ timestamp, end }: NewAppointment): Promise<void> {
    const duplicateAppointment = await prisma.appointment.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                timestamp: {
                  lte: timestamp,
                },
              },
              {
                end: {
                  gt: timestamp,
                },
              },
            ],
          },
          {
            AND: [
              {
                timestamp: {
                  lt: end,
                },
              },
              {
                end: {
                  gt: end,
                },
              },
            ],
          },
        ],
      },
    });

    if (duplicateAppointment.length)
      throw new DuplicateError("Appointment", "timeslot has been taken");
  }

  public async create(newAppointment: NewAppointment): Promise<Appointment> {
    return await prisma.appointment.create({ data: newAppointment });
  }

  public async findUnique({ params: { timestamp } }: Request) {
    const validTimestamp = this._validateTimestamp(timestamp);

    return await prisma.appointment.findUnique({
      where: { timestamp: validTimestamp },
      select: this._exposedFields,
    });
  }

  private _exposedFields = {
    id: true,
    timestamp: true,
    end: true,
  };
}

export const _appointment = new _Appointment();
