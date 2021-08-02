import { initializeTestData } from "../../helpers";
import { prisma } from "../../../src/prisma";
import providers from "../../../src/prisma/seeds/json/providers.json";

import supertest from "supertest";
import { app } from "../../../src/app";
const api = supertest(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Providers get request", () => {
  test("base endpoint returns providers", async () => {
    const { status, body } = await api.get("/api/providers");
    const filteredProviders = body.filter((provider: any) => {
      return providers[0].email === provider.email;
    });

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(filteredProviders).toHaveLength(1);
  });
});
