import { prisma } from "../../src/prisma";
import { appointment } from "../../src/repositories/appointment";
import { createTestAppointment, initializeTestData } from "../helpers";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Appointments Repository", () => {
  test("Appointments repository retrieves data", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      select: appointment.exposedFields,
    });
    const appointments = await appointment.findMany();

    expect(appointments).toEqual(appointmentsFromDb);
  });

  describe("Appointment creation", () => {
    test("Initialize function returns returns NewAppointment object from request", async () => {
      const { data } = await createTestAppointment();
      const initializedAppointment = appointment.initialize(
        JSON.parse(JSON.stringify(data))
      );

      expect(data).toMatchObject(initializedAppointment);
      expect(isNaN(data.timestamp.getDate())).toBe(false);
    });

    test("Initialize throws InvalidTime error", async () => {
      const {
        data: timestampWithInvalidMinutes,
      } = await createTestAppointment();
      const {
        data: timestampWithNonZeroSeconds,
      } = await createTestAppointment();
      timestampWithNonZeroSeconds.timestamp.setSeconds(5);

      const initialize = jest.fn(appointment.initialize);

      expect(() => initialize(timestampWithInvalidMinutes)).toThrow();
      expect(() => initialize(timestampWithNonZeroSeconds)).toThrow();
    });

    test("throws Duplicate error if appointment already exists", async () => {
      const { data } = await createTestAppointment({ pushToDb: true });

      try {
        await appointment.isDuplicate(data);
      } catch (e) {
        expect(e.message).toBe("timeslot has been taken");
      }
    });
  });

  describe("Query string is validated correctly", () => {
    test("validate field returns correct fields", () => {
      const validQuery = appointment.validateQuery(query);
      expect(validQuery).toEqual({
        start: start.valueOf(),
        end: end.valueOf(),
        hasQueryString: true,
      });
    });
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth());
    const end = new Date(now.getFullYear(), now.getMonth() + 1);

    const query = {
      start,
      end,
      invalid: "invalid",
    };
  });

  test("Validates that a date string is in JSON format", () => {
    const validTimestamp = new Date().toJSON();
    const invalidTimestamp1 = "hello";
    const invalidTimestamp2 = "Tue, 23 Feb 2021 01:53:24 GMT";
    const invalidTimestamp3 = validTimestamp.slice(0, -1);

    expect(() => appointment.validateTimestamp(validTimestamp)).not.toThrow();
    expect(() => appointment.validateTimestamp(invalidTimestamp1)).toThrow();
    expect(() => appointment.validateTimestamp(invalidTimestamp2)).toThrow();
    expect(() => appointment.validateTimestamp(invalidTimestamp3)).toThrow();
  });
});
