import { seedDatabase } from "../../prisma/seed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await seedDatabase();
});

test("Database is seeded", async () => {
  const appointments = await prisma.appointments.findMany();
  expect(appointments).toHaveLength(10);
  expect(appointments[0]).toHaveProperty("day");
});

afterAll(async () => {
  prisma.$disconnect();
});
