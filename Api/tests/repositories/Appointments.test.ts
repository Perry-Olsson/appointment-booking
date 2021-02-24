import { prisma } from "../../src/prisma";
import { createNewAppointment } from "../../src/prisma/seeds/utils";
import { Appointments } from "../../src/repositories/Appointments";
import {
  createAppointmentForRequest,
  createAppointmentTimestamp,
  filterAppointmentsFromDb,
  initializeAppointments,
  parseRawAppointment,
} from "../helpers";

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

    test("Sorted find many raw takes query arguments", async () => {
      const now = new Date();
      const queryObject = {
        month: now.getMonth(),
      };

      const rawAppointments = await Appointments.sorted.findManyRaw(
        queryObject
      );
      const appointments = rawAppointments.map((a: any) =>
        parseRawAppointment(a)
      );

      const appointmentsFromDb = filterAppointmentsFromDb(
        await prisma.appointment.findMany(),
        { month: now.getMonth() }
      );

      expect(appointments).toEqual(appointmentsFromDb);
    });
  });

  describe("Appointment creation", () => {
    test("initialize returns new appointment data from raw request", async () => {
      const rawRequestAppointment = createNewAppointment(
        createAppointmentTimestamp()
      );
      const newAppointment = Appointments.initialize(rawRequestAppointment);

      expect(newAppointment).toMatchObject(rawRequestAppointment);
      expect(isNaN(newAppointment.timestamp.getDate())).toBe(false);
    });

    test("Initialize throws InvalidTime error", () => {
      const requestBody = createAppointmentForRequest(
        createAppointmentTimestamp({ minute: 29 })
      );

      const initialize = jest.fn(Appointments.initialize);

      expect(() => initialize(requestBody)).toThrow();
    });

    test("throws Duplicate error if appointment already exists", async () => {
      const newAppointment = createNewAppointment(createAppointmentTimestamp());
      await prisma.appointment.create({ data: newAppointment });

      try {
        await Appointments.isDuplicate(newAppointment);
      } catch (e) {
        console.log(e.message);
        expect(e.message).toBe("timeslot has been taken");
      }
    });
  });

  describe("Query string is validated correctly", () => {
    test("validate field returns correct fields", () => {
      const validQuery = Appointments.validateQuery(query);
      expect(validQuery).toEqual({
        year: now.getFullYear(),
        month: now.getMonth(),
      });
    });
    const now = new Date();

    const query = {
      year: now.getFullYear(),
      month: now.getMonth().toString(),
      fake: "doesn't return obj with invalid field",
      hour: "doesn't return valid field with invalid value",
    };
  });

  test("Validates that a date string is in JSON format", () => {
    const validTimestamp = "2021-02-24T20:00:00.000Z";
    const invalidTimestamp1 = "hello";
    const invalidTimestamp2 = "Tue, 23 Feb 2021 01:53:24 GMT";

    expect(() => Appointments.validateTimestamp(validTimestamp)).not.toThrow();
    expect(() => Appointments.validateTimestamp(invalidTimestamp1)).toThrow();
    expect(() => Appointments.validateTimestamp(invalidTimestamp2)).toThrow();
  });
});
