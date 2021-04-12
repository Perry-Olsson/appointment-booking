import { prisma } from "../../prisma";
import { ExposedAppointment, TimeBoundry } from "./types";
import { NewAppointment } from "../../types";
import { DuplicateError } from "../../utils";
import { Appointment } from "@prisma/client";

class _Appointment {
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

  public async findUnique(timestamp: Date) {
    return await prisma.appointment.findUnique({
      where: { timestamp },
      select: this.exposedFields,
    });
  }

  public async findMany({
    hasQueryString,
    start,
    end,
  }: TimeBoundry): Promise<ExposedAppointment[]> {
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
