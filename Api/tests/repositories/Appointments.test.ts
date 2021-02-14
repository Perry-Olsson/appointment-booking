import { prisma } from "../../src/prisma";
import { Appointments } from "../../src/repositories/Appointments";
import { initializeAppointments } from "../helpers/initalizeDb";

beforeAll(async () => {
  await initializeAppointments();
});

describe("Appointments Repository", () => {
  test("Appointments repository retrieves data", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany();
    const appointments = await Appointments.findMany();

    expect(appointments).toEqual(appointmentsFromDb);
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
