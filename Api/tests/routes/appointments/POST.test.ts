import request from "supertest";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import {
  createTestAppointment,
  getValidAuthHeader,
  initializeTestData,
} from "../../helpers";
import { parseRawAppointment } from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("POST request", () => {
  test("/api/appointments creates an appointment", async () => {
    const { data } = await createTestAppointment();
    const response = await api
      .post("/api/appointments")
      .send(data)
      .set(getValidAuthHeader());
    expect(response.status).toBe(200);

    const appointment = parseRawAppointment(response.body);
    const appointmentFromDb = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });
    expect(appointment).toEqual(appointmentFromDb);

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });

  test("/api/appointments fails without customerId (email)", async () => {
    const { data } = await createTestAppointment();

    const response = await api
      .post("/api/appointments")
      .send({ timestamp: data.timestamp, end: data.end })
      .set(getValidAuthHeader());

    expect(response.status).toBe(500);
  });

  test("/api/appointments fails if appointment is conflicting with a providers schedule", async () => {
    const { data } = await createTestAppointment({ defaultProvider: true });
    data.timestamp.setHours(12);
    data.end.setHours(13);

    const response = await api.post("/api/appointments").send(data);

    expect(response.status).not.toBe(200);
  });

  test("/api/appointments fails without valid access token", async () => {
    const { data } = await createTestAppointment();

    const response = await api.post("/api/appointments").send(data);

    expect(response.status).toBe(401);
  });
});
