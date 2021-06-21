import { prisma } from "../../src/prisma";
import { createTestAppointment, initializeTestData } from "../helpers";
import { transferPastAppointments } from "../../src/utils";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Cron jobs", () => {
  test("Past appointments are transfered from main appointment table to past appointment table at midnight", async () => {
    //add past appointment to db
    const pastAppointmentTimestamp = new Date();
    pastAppointmentTimestamp.setUTCDate(
      pastAppointmentTimestamp.getUTCDate() - 2
    );

    const pastAppointment = await createTestAppointment({
      time: pastAppointmentTimestamp,
      pushToDb: true,
    });

    await transferPastAppointments();

    const pastAppointmentMainTable = await prisma.appointment.findUnique({
      where: { id: pastAppointment.appointment!.id },
    });
    const pastAppointmentsFromPastTable =
      await prisma.pastAppointments.findMany();

    expect(pastAppointmentMainTable).toBe(null);
  });
});
