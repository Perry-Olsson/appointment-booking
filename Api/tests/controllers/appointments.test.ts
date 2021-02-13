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

const api = request(app);

let appointmentsFromDb: Appointment[];

beforeAll(async () => {
  const newAppointments = createAppointments();
  await seedDatabase(newAppointments);

  appointmentsFromDb = await prisma.appointment.findMany({
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
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentsFromDb[0]);
    expect(appointmentsAreSorted(appointments)).toBe(true);
  });

  test("Request to /api/appointments/:month/:year returns appointments from specified month", async () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: { timestamp: "asc" },
      where: { month: currentMonth, year: currentYear },
    });

    const response = await api.get(
      `/api/appointments/${currentMonth}/${currentYear}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const appointments: Appointment[] = response.body.map((app: any) =>
      parseRawAppointment(app)
    );

    expect(
      filterUnwantedMonths(appointments, currentMonth, currentYear)
    ).toHaveLength(appointmentsFromDb.length);
  });
});

afterAll(() => {
  return prisma.$disconnect();
});
