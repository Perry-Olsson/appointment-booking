import request from "supertest";
import { PrismaClient } from "@prisma/client";

import { createAppointments, seedDatabase } from "../../prisma/seed";
import app from "../../app";

const prisma = new PrismaClient();
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
