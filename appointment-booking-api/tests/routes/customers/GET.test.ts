import supertest from "supertest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { createTwoPastAppointments, initializeTestData } from "../../helpers";
import customers from "../../../src/prisma/seeds/json/customers.json";
import { transferPastAppointments } from "../../../src/utils";
import { PastAppointment } from "@prisma/client";
const api = supertest(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("/user", () => {
  test("user is not returned without a valid token", async () => {
    const response = await api.get("/api/customers/user");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Unauthorized");
  });

  test("user is returned with valid token", async () => {
    const {
      body: { accessToken },
    } = await api
      .post("/api/customers/login")
      .send({ email: customers[0].email, password: customers[0].password });

    const response = await api
      .get("/api/customers/user")
      .set({ Authorization: `bearer ${accessToken}` });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(customers[0].email);
  });
});

describe("/pastAppointments", () => {
  test("Can retrieve customers past appointment from api endpoint", async () => {
    await createTwoPastAppointments();
    await transferPastAppointments();

    const {
      body: { accessToken },
    } = await api
      .post("/api/customers/login")
      .send({ email: customers[0].email, password: customers[0].password });

    const response = await api
      .get("/api/customers/pastAppointments")
      .set({ Authorization: `bearer ${accessToken}` });

    expect(response.body.length).toBeGreaterThan(0);
    expect(
      response.body.filter(
        (a: PastAppointment) => a.customerId !== "john@example.com"
      )
    ).toHaveLength(0);
  });
});
