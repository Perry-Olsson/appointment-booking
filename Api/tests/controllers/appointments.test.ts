import request from "supertest";
import { Appointment } from "@prisma/client";

import { createAppointments, seedDatabase } from "../../src/prisma/seed";
import { app, prisma } from "../../src/app";
import { appointmentsAreSorted, parseRawAppointment } from "./helpers";

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

    expect(appointments).toHaveLength(appointments.length);
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentsFromDb[0]);
    expect(appointmentsAreSorted(appointments)).toBe(true);
  });

  // test("Request to /api/appointments/:id", async () => {

  // })
});

afterAll(() => {
  return prisma.$disconnect();
});
