import { prisma } from "../../src/prisma";
import { createTestAppointment, initializeTestData } from "../helpers";
import { transferPastAppointments } from "../../src/utils";
import { ONE_DAY } from "../../src/constants";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Cron jobs", () => {
  test("Past appointments are transfered from main appointment table to past appointment table at midnight", async () => {
    const pastAppointmentTimestamp = new Date();
    pastAppointmentTimestamp.setUTCDate(
      pastAppointmentTimestamp.getUTCDate() - 2
    );

    await createTestAppointment({
      time: pastAppointmentTimestamp,
      pushToDb: true,
    });

    const anotherPastAppointment = new Date(pastAppointmentTimestamp);
    anotherPastAppointment.setUTCDate(anotherPastAppointment.getUTCDate() - 1);

    await createTestAppointment({
      time: anotherPastAppointment,
      pushToDb: true,
    });

    await transferPastAppointments();

    const pastAppointmentsMainTable = await prisma.appointment.findMany({
      where: { timestamp: { lt: new Date() } },
    });
    const pastAppointmentsFromPastTable = await prisma.pastAppointment.findMany(
      { where: { timestamp: { lt: new Date(Date.now() - ONE_DAY) } } }
    );

    expect(pastAppointmentsMainTable).toHaveLength(0);
    expect(pastAppointmentsFromPastTable).toHaveLength(2);
  });
});
