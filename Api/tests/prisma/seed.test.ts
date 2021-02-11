import { createAppointments, seedDatabase } from "../../src/prisma/seed";
import { Appointment, PrismaClient } from "@prisma/client";
import { getDaysBetweenAppointments } from "./helpers";

const prisma = new PrismaClient();

let appointments: Appointment[];
let appointmentsCreated: number;

beforeAll(async () => {
  console.log("seed start", Date.now());
  const newAppointments = createAppointments();
  appointmentsCreated = newAppointments.length;
  await seedDatabase(newAppointments);
  appointments = await prisma.appointment.findMany();
  console.log("seed end: ", Date.now());
});

describe("Database seeding", () => {
  test("Database is emptied and seeded", async () => {
    expect(appointments).toHaveLength(appointmentsCreated);
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
    const invalidTimes = appointments.filter(({ timestamp }) => {
      const hour = timestamp.getHours();
      const minutes = timestamp.getMinutes();

      if (hour <= 24 && hour >= 0 && (minutes === 0 || minutes === 30))
        return false;
      return true;
    });

    expect(invalidTimes).toHaveLength(0);
  });
});

afterAll(() => {
  return prisma.$disconnect();
});
