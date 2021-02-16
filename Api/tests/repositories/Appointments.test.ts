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
  describe("Sorted", () => {
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

  describe("Appointment creation", () => {
    const now = new Date();
    const rawRequest = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: 15,
      hour: 10,
      minute: 30,
    };

    test("initialize returns new appointment data from raw request", async () => {
      const newAppointment = Appointments.initialize(rawRequest);

      expect(newAppointment).toMatchObject(rawRequest);
      expect(isNaN(newAppointment.timestamp.getDate())).toBe(false);
    });
  });
});

afterAll(() => prisma.$disconnect());
