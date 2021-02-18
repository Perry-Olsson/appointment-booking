import { prisma } from "../../src/prisma";
import { Appointments } from "../../src/repositories/Appointments";
import { createAppointmentTimestamp, initializeAppointments } from "../helpers";
import { createAppointmentForRequest } from "../helpers";

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

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
    test("initialize returns new appointment data from raw request", async () => {
      const rawRequestAppointment = createAppointmentForRequest(
        createAppointmentTimestamp()
      );
      const newAppointment = Appointments.initialize(rawRequestAppointment);

      expect(newAppointment).toMatchObject(rawRequestAppointment);
      expect(
        isNaN(newAppointment.timestamp.getDate()) &&
          isNaN(newAppointment.timestampz.getDate())
      ).toBe(false);
    });

    test("Initialize throws InvalidTime error", () => {
      const requestBody = createAppointmentForRequest(
        createAppointmentTimestamp({ minute: 29 })
      );

      const initialize = jest.fn(Appointments.initialize);

      expect(() => initialize(requestBody)).toThrow();
    });
  });
});
