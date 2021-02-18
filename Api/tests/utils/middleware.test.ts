import request from "supertest";
import { app } from "../../src/app";
import { NewAppointment } from "../../src/types";
import { createNewAppointment } from "../../src/prisma/seeds/utils/createNewAppointment";
import { initializeAppointments } from "../helpers/initalizeDb";
import { prisma } from "../../src/prisma";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("Error handler middleware", () => {
  test("Handles duplicate appointment error from database", async () => {
    const newAppointment = createNewAppointment(createAppointmentTimestamp());
    const appointment = await prisma.appointment.create({
      data: newAppointment,
    });

    const response = await api
      .post("/api/appointments")
      .send(createNewAppointment(createAppointmentTimestamp()));

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: "Duplicate appointment",
      message: "timeslot has been taken",
    });

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });
});

const createAppointmentTimestamp = (
  time: Partial<NewAppointment> = {}
): Date => {
  const now = new Date();

  const year = time.year || now.getFullYear();
  const month = time.month || now.getMonth() + 1;
  const day = time.day || 15;
  const hour = time.hour || 10;
  const minute = time.minute || 30;

  return new Date(year, month, day, hour, minute);
};
