import request from "supertest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { createNewAppointment } from "../../../src/prisma/seeds/utils";
import {
  createAppointmentTimestamp,
  initializeAppointments,
} from "../../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("DELETE request", () => {
  test("request to /api/appointments/:timestamp successfully deletes an appointment", async () => {
    const newAppointment = createNewAppointment(createAppointmentTimestamp());
    await prisma.appointment.create({
      data: newAppointment,
    });

    const response = await api.delete(
      `/api/appointments/${newAppointment.timestamp.toJSON()}`
    );

    expect(response.status).toBe(204);

    const deletedAppointment = await prisma.appointment.findUnique({
      where: { timestamp: newAppointment.timestamp },
    });

    expect(deletedAppointment).toBe(null);
  });
});
