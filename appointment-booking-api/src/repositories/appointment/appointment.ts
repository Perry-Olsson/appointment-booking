import { prisma } from "../../prisma";
import { ExposedAppointment, TimeBoundry } from "./types";
import { NewAppointment } from "../../types";
import { DuplicateError } from "../../utils";
import { Appointment } from "@prisma/client";
import { TimestampValidator } from "../utils";

class _Appointment extends TimestampValidator {
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

  public async isDuplicate({ timestamp, end }: NewAppointment): Promise<void> {
    const duplicateAppointment = await prisma.appointment.findMany(
      this._getIsDuplicateFilter(timestamp, end)
    );

    if (duplicateAppointment.length)
      throw new DuplicateError("Appointment", "timeslot has been taken");
  }

  public async create(newAppointment: NewAppointment): Promise<Appointment> {
    return await prisma.appointment.create({ data: newAppointment });
  }

  public async findUnique(timestamp: string) {
    const validTimestamp = this.validateJSONTimestamp(timestamp);

    return await prisma.appointment.findUnique({
      where: { timestamp: validTimestamp },
      select: this.exposedFields,
    });
  }

  public async findMany(query: any): Promise<ExposedAppointment[]> {
    const { hasQueryString, start, end } = this.validateQuery(query);
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
      select: this.exposedFields,
      orderBy: { timestamp: "asc" },
    });

    return appointments;
  }

  public validateQuery(query?: any): TimeBoundry {
    if (!query || query.start === undefined || query.end === undefined)
      return { hasQueryString: false, start: 0, end: 0 };

    const start = this.validateTimeString(query.start);
    const end = this.validateTimeString(query.end);

    return { hasQueryString: true, start, end };
  }

  public exposedFields = {
    id: true,
    createdAt: true,
    updatedAt: true,
    timestamp: true,
    end: true,
  };

  private _getIsDuplicateFilter(timestamp: Date, end: Date) {
    return {
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
    };
  }
}

export const appointment = new _Appointment();
