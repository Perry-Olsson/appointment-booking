import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import { app } from "../../../src/app";
import supertest from "supertest";
const api = supertest(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Service Hours get requests", () => {
  test("Service Hours are returned", async () => {
    const { status, body } = await api.get("/api/serviceHours");

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(7);
  });
});
