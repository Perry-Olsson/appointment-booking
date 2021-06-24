import { prisma } from "../../src/prisma";
import { createTwoPastAppointments, initializeTestData } from "../helpers";
import { PastAppointmentDataAccess } from "../../src/repositories";
import { transferPastAppointments } from "../../src/utils";

const pastAppointment = new PastAppointmentDataAccess();

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Past appointment repository", () => {
  test("Can retrieve past appointments from database", async () => {
    const pastAppointments = await createTwoPastAppointments();
    await transferPastAppointments();

    const pastAppointmentsFromDb = await pastAppointment.getPastAppointments();

    expect(pastAppointmentsFromDb.length).toBe(
      Object.keys(pastAppointments).length
    );
    expect(
      pastAppointmentsFromDb.some(
        v => v.id === pastAppointments.pastAppointmentOne.appointment!.id
      )
    ).toBe(true);
  });
});
