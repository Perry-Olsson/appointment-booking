import { app } from "../../../src/app";
import request from "supertest";
import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import { testGuest, testUser } from "../../constants";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer creation", () => {
  test("/api/customers creates a new user", async () => {
    const response = await api.post("/api/customers").send(testUser);
    const createdUser = await prisma.customer.findUnique({
      where: { email: testUser.email },
      include: { appointments: true },
    });
    if (!createdUser) throw Error("Customer was not created");

    expect(response.status).toBe(200);
    expect(response.body.password).toBeUndefined();
    expect(createdUser).toMatchObject(response.body);
  });

  test("/api/customers creates a new guest", async () => {
    const response = await api.post("/api/customers").send(testGuest);
    const createdGuest = await prisma.customer.findUnique({
      where: { email: testGuest.email },
      include: { appointments: true },
    });
    if (!createdGuest) throw Error("Customer wasnt created");

    expect(response.status).toBe(200);
    expect(createdGuest.password).toBeNull();
    expect(createdGuest).toMatchObject(response.body);
  });
});
