import request from "supertest";
import { app } from "../../src/app";
import { initializeAppointments } from "../helpers/initalizeDb";
import { prisma } from "../../src/prisma";
import { createTestAppointment } from "../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("Error handler middleware", () => {
  test("Handles duplicate appointment error", async () => {
    const { data, appointment } = await createTestAppointment({
      pushToDb: true,
    });

    const response = await api.post("/api/appointments").send(data);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Duplicate appointment",
      message: "timeslot has been taken",
    });

    await prisma.appointment.delete({ where: { id: appointment?.id } });
  });

  test("Handles invalid time error", async () => {
    const { data } = await createTestAppointment({
      time: { minute: 25 },
    });

    const response = await api.post("/api/appointments").send(data);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid time",
      message: "Appointments must be scheduled on the hour or half hour",
    });
  });
});
