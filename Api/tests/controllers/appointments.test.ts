import request from "supertest";
import { Appointment } from "@prisma/client";
import { createAppointments, seedDatabase } from "../../src/prisma/seed";
import { app } from "../../src/app";
import {
  appointmentsAreSorted,
  filterUnwantedMonths,
  parseRawAppointment,
} from "./helpers";
import { prisma } from "../../src/prisma";
import { ONE_MONTH } from "../../src/constants";

const api = request(app);

let appointmentSeeds: Appointment[];

beforeAll(async () => {
  const newAppointments = createAppointments();
  await seedDatabase(newAppointments);

  appointmentSeeds = await prisma.appointment.findMany({
    orderBy: { timestamp: "asc" },
  });
});

describe("GET request", () => {
  test("Request to /api/appointments returns appointments", async () => {
    const response = await api.get("/api/appointments");
    const appointments: Appointment[] = response.body.map((app: any) =>
      parseRawAppointment(app)
    );

    expect(response.status).toBe(200);
    expect(appointments).toHaveLength(appointments.length);
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentSeeds[0]);
    expect(appointmentsAreSorted(appointments)).toBe(true);
  });

  describe("Request to /api/appointments/:month", () => {
    test("Request to /api/appointments/:month returns appointments from specified month", async () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const appointmentsFromDb = await prisma.appointment.findMany({
        orderBy: { timestamp: "asc" },
        where: { month: currentMonth, year: currentYear },
      });

      const response = await api.get(`/api/appointments/${currentMonth}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      const appointments: Appointment[] = response.body.map((app: any) =>
        parseRawAppointment(app)
      );

      expect(appointments[0]).toEqual(appointmentsFromDb[0]);
      expect(
        filterUnwantedMonths(appointments, currentMonth, currentYear)
      ).toHaveLength(appointmentsFromDb.length);
    });

    test("Returns correct months appointment if month is in next year", async () => {
      const { id, month, year } = await createAppointment(
        Date.now() + 11 * ONE_MONTH,
        { hour: 12, minute: 0 }
      );

      const appointmentsFromDb = await prisma.appointment.findMany({
        where: {
          month,
          year,
        },
      });

      const response = await api.get(`/api/appointments/${month}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);

      const appointments: Appointment[] = response.body.map((app: any) =>
        parseRawAppointment(app)
      );

      expect(filterUnwantedMonths(appointments, month, year)).toHaveLength(
        appointmentsFromDb.length
      );

      await prisma.appointment.delete({ where: { id } });
    });
  });
});

afterAll(() => {
  return prisma.$disconnect();
});

const createAppointment = async (
  utc: number,
  { hour, minute }: Time
): Promise<Appointment> => {
  const date = new Date(utc);
  date.setHours(hour);
  date.setMinutes(minute);

  return await prisma.appointment.create({
    data: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      timestamp: date,
    },
  });
};

interface Time {
  hour: number;
  minute: number;
}
