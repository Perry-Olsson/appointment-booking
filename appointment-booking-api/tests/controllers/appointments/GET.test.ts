import request from "supertest";
import { Appointment } from "@prisma/client";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import {
  createTestAppointment,
  filterAppointmentsFromDb,
  initializeAppointments,
  parseRawAppointment,
} from "../../helpers";
import {
  appointmentsAreSorted,
  filterUnwantedMonths,
  createAppointmentsOneYearApart,
  deleteAppointmentsOneYearApart,
} from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

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

      const appointmentsFromDb = filterAppointmentsFromDb(
        await prisma.appointment.findMany(),
        { year: now.getFullYear(), month: now.getMonth() }
      );

      const response = await api.get(
        `/api/appointments/?month=${now.getMonth()}&year=${now.getFullYear()}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);
    });

    test("Query string with month and no year does not return month from past years", async () => {
      const { id1, id2, month, year } = await createAppointmentsOneYearApart();

      const appointmentsFromDb = filterAppointmentsFromDb(
        await prisma.appointment.findMany(),
        { year, month }
      );

      const response = await api.get(`/api/appointments/?month=${month}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);

      const appointments: Appointment[] = response.body.map((app: any) =>
        parseRawAppointment(app)
      );

      expect(filterUnwantedMonths(appointments, month, year)).toHaveLength(
        appointmentsFromDb.length
      );

      await deleteAppointmentsOneYearApart({ id1, id2 });
    });
  });

  describe("Request to /api/appointments/:timestamp", () => {
    test("Returns correct appointment", async () => {
      const { appointment } = await createTestAppointment({
        pushToDb: true,
      });
      const response = await api.get(
        `/api/appointments/${appointment?.timestamp.toJSON()}`
      );

      const appointmentFromApi = parseRawAppointment(response.body);

      expect(response.status).toBe(200);
      expect(appointmentFromApi).toEqual(appointment);
    });

    test("Invalid timestamp returns correct error", async () => {
      const response = await api.get("/api/appointments/invalid");

      const invalidTimestamp = "2021-02-21T00:54:12:988f";
      const almostValidResponse = await api.get(
        `/api/appointments/${invalidTimestamp}`
      );

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid timestamp",
        message:
          "timestamp invalid is invalid. Timestamp must be in json format",
      });

      expect(almostValidResponse.status).toBe(400);
      expect(almostValidResponse.body).toEqual({
        error: "Invalid timestamp",
        message: `timestamp ${invalidTimestamp} is invalid. Timestamp must be in json format`,
      });
    });
  });
});
