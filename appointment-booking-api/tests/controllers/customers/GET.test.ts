import supertest from "supertest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import customers from "../../../src/prisma/seeds/json/customers.json";
const api = supertest(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("user profile", () => {
  test("profile is not returned without a valid token", async () => {
    const response = await api.get("/api/customers/profile");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("profile is returned with valid token", async () => {
    const {
      body: { token },
    } = await api
      .post("/api/customers/login")
      .send({ email: customers[0].email, password: customers[0].password });

    const response = await api
      .get("/api/customers/profile")
      .set({ Authorization: `bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(customers[0].email);
  });
});
