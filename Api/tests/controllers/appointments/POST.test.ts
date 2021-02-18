import request from "supertest";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { createNewAppointment } from "../../../src/prisma/seeds/utils";
import { NewAppointment } from "../../../src/types";
import {
  initializeAppointments,
  createAppointmentTimestamp,
} from "../../helpers";
import { parseRawAppointment } from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("POST request", () => {
  test("/api/appointments creates an appointment", async () => {
    const now = new Date();
    const appointmentTimestamp = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      15,
      10,
      30
    );
    const newAppointment = createNewAppointment(appointmentTimestamp);

    const response = await api.post("/api/appointments").send(newAppointment);
    expect(response.status).toBe(200);

    const appointment = parseRawAppointment(response.body);
    const appointmentFromDb = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });
    expect(appointment).toEqual(appointmentFromDb);

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });

  test("/api/appointments with now timestamp creates a timestamp from provided data", async () => {
    const newAppointmentNoTimestamp = createNewAppointment(
      createAppointmentTimestamp()
    ) as Partial<NewAppointment>;
    delete newAppointmentNoTimestamp.timestamp;
    delete newAppointmentNoTimestamp.timestampz;

    const response = await api
      .post("/api/appointments")
      .send(newAppointmentNoTimestamp);
    expect(response.status).toBe(200);

    const appointment = parseRawAppointment(response.body);
    const appointmentFromDb = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });
    expect(appointment).toEqual(appointmentFromDb);

    await prisma.appointment.delete({ where: { id: appointment.id } });
  });
});
