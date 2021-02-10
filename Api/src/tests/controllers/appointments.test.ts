import request from "supertest";

import { createAppointments, seedDatabase } from "../../prisma/seed";
import { app, prisma } from "../../app";

const api = request(app);

beforeAll(async () => {
  const newAppointments = createAppointments();
  await seedDatabase(newAppointments);
});

describe("GET request to /api/appointments", () => {
  test("request returns appointments", async () => {
    const response = await api.get("/api/appointments");
    const { body } = response;
    expect(typeof body[0]).toBe("object");
  });
});

afterAll(async () => {
  return await prisma.$disconnect();
});
