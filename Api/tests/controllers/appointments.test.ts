import request from "supertest";

import { createAppointments, seedDatabase } from "../../src/prisma/seed";
import { app, prisma } from "../../src/app";

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
  await prisma.$disconnect();
});
