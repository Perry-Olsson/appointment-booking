import { prisma } from "../../prisma";
import {
  AppointmentMixin,
  AppointmentRepo,
  ExposedAppointment,
  TimeBoundry,
} from "./types";
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
import { BoundryError, DuplicateError, TimestampError } from "../../utils";
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

  public async findMany({ query }: Request): Promise<ExposedAppointment[]> {
    const { hasQueryString, start, end } = this._validateQuery(query);
    const where = hasQueryString
      ? {
          AND: [
            {
              timestamp: {
                gte: new Date(start),
              },
            },
            {
              timestamp: {
                lt: new Date(end),
              },
            },
          ],
        }
      : {};

    const appointments = await prisma.appointment.findMany({
      where,
      select: this._exposedFields,
    });

    return appointments;
  }

  private _validateQuery(query: any): TimeBoundry {
    if (query.start === undefined || query.end === undefined)
      return { hasQueryString: false, start: 0, end: 0 };

    const start = this._toMilliseconds(query.start);
    const end = this._toMilliseconds(query.end);

    if (start === false || end === false) throw new BoundryError();

    return { hasQueryString: true, start, end };
  }

  private _toMilliseconds(field: any): number | false {
    const date = new Date(field);
    const num = Number(date);
    if (isNaN(num)) {
      return false;
    } else return num;
  }

  private _exposedFields = {
    id: true,
    createdAt: true,
    updatedAt: true,
    timestamp: true,
    end: true,
  };
}

export const _appointment = new _Appointment();
