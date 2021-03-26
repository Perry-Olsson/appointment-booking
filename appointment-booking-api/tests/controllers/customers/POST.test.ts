import { app } from "../../../src/app";
import request from "supertest";
import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import { testGuest, testUser } from "../../constants";
import { customer } from "../../../src/repositories/customer";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer creation", () => {
  test("/api/customers creates a new user", async () => {
    const { status, body } = await api.post("/api/customers").send(testUser);
    const createdUser = await prisma.customer.findUnique({
      where: { email: testUser.email },
      include: { appointments: true },
    });
    if (!createdUser) throw Error("Customer was not created");

    expect(status).toBe(200);
    expect(body.customer.password).toBeUndefined();
    expect(createdUser).toMatchObject(body.customer);

    const decodedToken = customer.decodeToken(body.token);
    expect(decodedToken.email).toBe(testUser.email);

    await prisma.customer.delete({ where: { email: createdUser.email } });
  });

  test("/api/customers creates a new guest", async () => {
    const { status, body } = await api.post("/api/customers").send(testGuest);
    const createdGuest = await prisma.customer.findUnique({
      where: { email: testGuest.email },
      include: { appointments: true },
    });
    if (!createdGuest) throw Error("Customer wasnt created");

    expect(status).toBe(200);
    expect(createdGuest.password).toBeNull();
    expect(createdGuest).toMatchObject(body.customer);
    expect(body.token).toBe(null);

    await prisma.customer.delete({ where: { email: createdGuest.email } });
  });
});

describe("Cusotmer login", () => {
  test.only("/api/customers/login returns access token to valid user", async () => {
    const { email, password } = {
      email: "john@example.com",
      password: "johnPassword",
    };
    console.log(password);
    const { status, body } = await api
      .post("/api/customers/login")
      .send({ email, password });

    expect(status).toBe(200);
    expect(body.customer.password).toBeUndefined();
    expect(typeof body.token).toBe("string");
  });
});
