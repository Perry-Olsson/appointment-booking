import { initializeTestData } from "../helpers";
import { prisma } from "../../src/prisma";
import { provider } from "../../src/repositories";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Provider read operations", () => {
  test("providers are returned with schedule and procedure fields", async () => {
    const providers = await provider.getProviders();

    expect(providers).not.toBe(null);
    expect(providers[0]).toHaveProperty("schedule");
    expect(providers[0]).toHaveProperty("procedures");
    expect(providers[0].schedule).toHaveProperty("Sunday");
    expect(providers[0].procedures.length).toBeGreaterThan(0);
  });
});
