import request from "supertest";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { createNewAppointment } from "../../../src/prisma/seeds/utils";
import {
  createAppointmentTimestamp,
  initializeAppointments,
} from "../../helpers";
import { parseRawAppointment } from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("POST request", () => {
  test("/api/appointments creates an appointment", async () => {
    const newAppointment = createNewAppointment(createAppointmentTimestamp());

    const response = await api.post("/api/appointments").send(newAppointment);
    expect(response.status).toBe(200);

    const appointment = parseRawAppointment(response.body);
    const appointmentFromDb = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });
    expect(appointment).toEqual(appointmentFromDb);

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });
});
