import { ONE_DAY } from "../../src/constants";
import { prisma } from "../../src/prisma";
import { AppointmentDataAccess } from "../../src/repositories/appointment";
import { createTestAppointment, initializeTestData } from "../helpers";

const appointment = new AppointmentDataAccess();

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Appointments Repository", () => {
  describe("Appointment creation", () => {
    test("throws Duplicate error if appointment already exists", async () => {
      const { data } = await createTestAppointment({ pushToDb: true });

      try {
        await appointment.isDuplicate(data);
      } catch (e) {
        expect(e.message).toBe("timeslot has been taken");
      }
    });
  });

  test("get appointments function returns correct appointments from given parameter", async () => {
    const now = new Date();
    const later = new Date(now.valueOf() + ONE_DAY * 10);
    const appointmentsFromDb = await prisma.appointment.findMany({
      where: {
        AND: [{ timestamp: { gte: now } }, { timestamp: { lt: later } }],
      },
    });
    const appointments = await appointment.findMany({
      hasQueryString: true,
      start: now.valueOf(),
      end: later.valueOf(),
    });
    expect(appointments).toHaveLength(appointmentsFromDb.length);
  });
});
