import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Past appointment repository", () => {
  test("Can retrieve past appointments from database", async () => {
    pastAppointment.getAppointments();
  });
});
