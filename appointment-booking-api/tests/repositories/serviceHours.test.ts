import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import { serviceHours } from "../../src/repositories/serviceHours";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Service hours", () => {
  test("Hours of service for each day are returned in ascending order", async () => {
    const hours = await serviceHours.getServiceHours();
    const filteredHours = hours.filter((day, i) => day.day !== i); //checking order of appointments

    expect(hours.length).toBeGreaterThan(0);
    expect(filteredHours).toHaveLength(0);
  });
});
