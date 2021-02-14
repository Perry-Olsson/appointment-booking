import request from "supertest";
import { Appointment } from "@prisma/client";
import { app } from "../../src/app";
import {
  appointmentsAreSorted,
  filterUnwantedMonths,
  parseRawAppointment,
} from "./helpers";
import { prisma } from "../../src/prisma";
import { ONE_MONTH } from "../../src/constants";
import { createAppointment } from "../helpers";
import { initializeAppointments } from "../helpers/initalizeDb";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

describe("GET request", () => {
  test("Request to /api/appointments returns appointments", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: { timestamp: "asc" },
    });
    const response = await api.get("/api/appointments");
    const appointments: Appointment[] = response.body.map((app: any) =>
      parseRawAppointment(app)
    );

    expect(response.status).toBe(200);
    expect(appointments).toHaveLength(appointmentsFromDb.length);
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentsFromDb[0]);
    expect(appointmentsAreSorted(appointments)).toBe(true);
  });

  describe("Query string request", () => {
    test("Request with query string returns correct appointments", async () => {
      const now = new Date();

      const appointmentsFromDb = await prisma.appointment.findMany({
        where: { month: now.getMonth(), year: now.getFullYear() },
      });

      const response = await api.get(
        `/api/appointments/?month=${now.getMonth()}&year=${now.getFullYear()}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);
    });

    test("Query string with month and no year", async () => {
      const elevenMonthsFromNow = Date.now() + 11 * ONE_MONTH;
      const lastMonth = Date.now() - ONE_MONTH;
      const { id: id1, month, year } = await createAppointment(
        elevenMonthsFromNow,
        {
          hour: 12,
          minute: 0,
        }
      );
      const { id: id2 } = await createAppointment(lastMonth, {
        hour: 12,
        minute: 0,
      });

      const appointmentsFromDb = await prisma.appointment.findMany({
        where: {
          month,
          year,
        },
      });

      const response = await api.get(`/api/appointments/?month=${month}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);

      const appointments: Appointment[] = response.body.map((app: any) =>
        parseRawAppointment(app)
      );

      expect(filterUnwantedMonths(appointments, month, year)).toHaveLength(
        appointmentsFromDb.length
      );

      await prisma.appointment.deleteMany({
        where: { OR: [{ id: id1 }, { id: id2 }] },
      });
    });
  });
});

afterAll(() => {
  return prisma.$disconnect();
});
