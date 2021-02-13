import { Appointment } from "@prisma/client";
import { prisma } from "../../src/app";
import { createAppointments, seedDatabase } from "../../src/prisma/seed";
import Appointments from "../../src/repositories/Appointment";

let appointmentSeeds: Appointment[];

beforeAll(async () => {
  const newAppointments = createAppointments();
  await seedDatabase(newAppointments);

  appointmentSeeds = await prisma.appointment.findMany();
});

describe("Appointments Repository", () => {
  test("Appointments repository retrieves data", async () => {
    const appointments = await Appointments.findMany();
    expect(appointments).toEqual(appointmentSeeds);
  });

  test("Sorted field of repository returns sorted appointments", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: { timestamp: "asc" },
    });
    const appointments = await Appointments.sorted.findMany();

    expect(appointments).toEqual(appointmentsFromDb);
  });

  test("Sorted field takes query arguements", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: { timestamp: "asc" },
      where: { month: 1 },
    });
    const appointments = await Appointments.sorted.findMany({
      where: { month: 1 },
    });

    expect(appointments).toEqual(appointmentsFromDb);
  });
});

afterAll(() => prisma.$disconnect());
