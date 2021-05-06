import request from "supertest";
import { Appointment } from "@prisma/client";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import {
  createTestAppointment,
  filterAppointmentsFromDb,
  initializeTestData,
  parseRawAppointment,
  PushToDbError,
} from "../../helpers";
import { exposedAppointmentFields } from "../../../src/repositories/constants";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("GET request", () => {
  test("Request to /api/appointments returns appointments without customerId field", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      select: exposedAppointmentFields,
      orderBy: { timestamp: "asc" },
    });
    const response = await api.get("/api/appointments");
    const appointments: Appointment[] = response.body.map((app: any) =>
      parseRawAppointment(app)
    );

    expect(response.status).toBe(200);
    expect(appointments).toHaveLength(appointmentsFromDb.length);
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentsFromDb[0]);
  });

  describe("Query string request", () => {
    test("Request with query string returns correct appointments", async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const appointmentsFromDb = await prisma.appointment.findMany();
      const filteredAppointments = filterAppointmentsFromDb(
        appointmentsFromDb,
        { year, month }
      );

      const response = await api.get(
        `/api/appointments/?start=${new Date(year, month)}&end=${new Date(
          year,
          month + 1
        )}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(filteredAppointments.length);
    });

    test("Query for appointments within a certain month matches correct timezone", async () => {
      const now = new Date();
      const year = now.getFullYear() + 2;
      const june = 5;

      //appointment will be stored in database as july due to timezone offset
      const { appointment } = await createTestAppointment({
        pushToDb: true,
        time: {
          start: {
            year,
            month: june,
            day: 30,
            hour: 20,
            minute: 0,
          },
        },
      });
      if (!appointment) throw new PushToDbError();

      const appointmentsFromDb = await prisma.appointment.findMany();
      const filteredAppointments = filterAppointmentsFromDb(
        appointmentsFromDb,
        { year, month: june }
      );

      const response = await api.get(
        `/api/appointments/?start=${new Date(year, june)}&end=${new Date(
          year,
          june + 1
        )}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(filteredAppointments.length);

      await prisma.appointment.delete({ where: { id: appointment.id } });
    });
  });
});
