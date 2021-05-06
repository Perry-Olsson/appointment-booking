import { prisma } from "../../prisma";
import { ExposedAppointment, TimeBoundry } from "./types";
import { NewAppointment } from "../../types";
import { AppointmentConflictsError, DuplicateError } from "../../utils";
import { Appointment } from "@prisma/client";
import { exposedAppointmentFields } from "../constants";
import { to4DigitTimeNumber } from "../utils";
import { AppointmentDAO } from "../../controllers/types";

export class AppointmentDataAccess implements AppointmentDAO {
  public async create(newAppointment: NewAppointment): Promise<Appointment> {
    return await prisma.appointment.create({ data: newAppointment });
  }

  public async isConflicting({ timestamp, end, providerId }: NewAppointment) {
    const schedule = await prisma.schedule.findUnique({
      where: { providerId },
    });

    if (!schedule) throw new Error("Could not find a queried provider");

    const day = schedule[timestamp.getDayString()];

    if (day.length === 0 || this._appointmentConflicts(day, timestamp, end))
      throw new AppointmentConflictsError();
  }

  private _appointmentConflicts(
    day: string[],
    timestamp: Date,
    end: Date
  ): boolean {
    const start = timestamp.get4DigitTimeNumber();
    const finish = end.get4DigitTimeNumber();

    for (let i = 0; i < day.length; i++) {
      const time = to4DigitTimeNumber(day[i]);
      if (i === 0) {
        if (start < time) return true;
      } else if (i === day.length - 1) {
        if (finish >= time) {
          return true;
        }
      } else if (i % 2 !== 0) {
        const unavailableHoursEnd = to4DigitTimeNumber(day[i + 1]);
        if (start < unavailableHoursEnd) {
          if (start >= time || finish > time) return true;
        }
      }
    }

    return false;
  }

  public async isDuplicate({
    timestamp,
    end,
    providerId,
  }: NewAppointment): Promise<void> {
    const duplicateAppointment = await prisma.appointment.findMany(
      this._getIsDuplicateFilter(timestamp, end, providerId)
    );

    if (duplicateAppointment.length)
      throw new DuplicateError("Appointment", "timeslot has been taken");
  }

  public async getAppointments({
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
      select: exposedAppointmentFields,
      orderBy: { timestamp: "asc" },
    });

    return appointments;
  }

  private _getIsDuplicateFilter(
    timestamp: Date,
    end: Date,
    providerId: string
  ) {
    return {
      where: {
        AND: [
          { providerId },
          {
            OR: [
              {
                AND: [
                  {
                    timestamp: {
                      gte: timestamp,
                    },
                  },
                  {
                    timestamp: {
                      lt: end,
                    },
                  },
                ],
              },
              {
                AND: [
                  {
                    timestamp: {
                      lt: timestamp,
                    },
                  },
                  {
                    end: {
                      gt: timestamp,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }
}
