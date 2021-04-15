import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import supertest from "supertest";
import { app } from "../../../src/app";

const api = supertest(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("/api/procedures", () => {
  test("api returns procedures", async () => {
    const response = await api.get("/api/procedures");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("duration");
  });
});
