import { Appointment } from "@prisma/client";
import { getDaysBetweenAppointments } from "./helpers";
import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";

let appointments: Appointment[];

beforeAll(async () => {
  await initializeTestData();
  appointments = await prisma.appointment.findMany();
});

afterAll(() => prisma.$disconnect());

describe("Database seeding", () => {
  test("Database is emptied and seeded", async () => {
    expect(appointments.length).toBeGreaterThan(1);
  });

  test("appointment seeds are randomly assigned dates", async () => {
    const daysBetweenAppointments = getDaysBetweenAppointments(appointments);

    const isRandom = daysBetweenAppointments.some((val, i, arr) => {
      if (i !== arr.length - 1) return val !== arr[i + 1];
      return false;
    });

    expect(isRandom).toBeTruthy();
  });

  test("Appointments time is valid", async () => {
    const invalidTimes = appointments.filter(({ timestamp, end }) => {
      const startHour = timestamp.getHours();
      const startMinute = timestamp.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();

      const hour = (startHour + endHour) / 2;

      if (
        hour <= 24 &&
        hour >= 0 &&
        startMinute % 15 === 0 &&
        endMinute % 15 === 0
      )
        return false;
      return true;
    });

    expect(invalidTimes).toHaveLength(0);
  });
});
