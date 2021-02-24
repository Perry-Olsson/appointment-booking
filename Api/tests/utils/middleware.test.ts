import request from "supertest";
import { app } from "../../src/app";
import { createNewAppointment } from "../../src/prisma/seeds/utils/createNewAppointment";
import { initializeAppointments } from "../helpers/initalizeDb";
import { prisma } from "../../src/prisma";
import { createAppointmentTimestamp } from "../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("Error handler middleware", () => {
  test("Handles duplicate appointment error", async () => {
    const newAppointment = createNewAppointment(createAppointmentTimestamp());
    const appointment = await prisma.appointment.create({
      data: newAppointment,
    });

    const response = await api.post("/api/appointments").send(newAppointment);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Duplicate appointment",
      message: "timeslot has been taken",
    });

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });

  test("Handles invalid time error", async () => {
    const newAppointment = createNewAppointment(
      createAppointmentTimestamp({ minute: 25 })
    );

    const response = await api.post("/api/appointments").send(newAppointment);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid time",
      message: "Appointments must be scheduled on the hour or half hour",
    });
  });
});
