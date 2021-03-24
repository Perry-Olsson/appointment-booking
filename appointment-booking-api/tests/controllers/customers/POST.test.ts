import { app } from "../../../src/app";

import request from "supertest";
import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer creation", async () => {
  test("/api/appointments creates a new customer", async () => {
    const response = await api.post("/api/customers");

    expect(response.status).toBe(200);
  });
});
