import request from "supertest";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { createTestAppointment, initializeTestData } from "../../helpers";
import { parseRawAppointment } from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("POST request", () => {
  test("/api/appointments creates an appointment", async () => {
    const { data } = await createTestAppointment();
    const response = await api.post("/api/appointments").send(data);
    expect(response.status).toBe(200);

    const appointment = parseRawAppointment(response.body);
    const appointmentFromDb = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });
    expect(appointment).toEqual(appointmentFromDb);

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });
});
