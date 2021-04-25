import { app } from "../../../src/app";
import request from "supertest";
import { prisma } from "../../../src/prisma";
import { initializeTestData } from "../../helpers";
import { testGuest, testUser } from "../../constants";
import { auth } from "../../../src/utils/auth";

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
    expect(body.password).toBeUndefined();
    expect(createdUser).toMatchObject(body);

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
    expect(createdGuest).toMatchObject(body);

    await prisma.customer.delete({ where: { email: createdGuest.email } });
  });
});

describe("Cusotmer login", () => {
  test("/api/customers/login returns access token to valid user", async () => {
    const { email, password } = {
      email: "john@example.com",
      password: "johnsPassword",
    };
    const response = await api
      .post("/api/customers/login")
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(typeof response.body.accessToken).toBe("string");

    expect(response.body.accessToken).toBe(auth.createAccessToken(email));
    const refreshToken = response.get("Set-Cookie")[0].match(/=(.+); /);
    if (!refreshToken) throw Error("bad regex");
    expect(refreshToken[1]).toBe(auth.createRefreshToken(email));
  });
});

describe("Refresh token route", () => {
  test("User with valid refresh token can get access token", async () => {
    const { email, password } = {
      email: "john@example.com",
      password: "johnsPassword",
    };
    const loginResponse = await api
      .post("/api/customers/login")
      .send({ email, password });

    expect(loginResponse.status).toBe(200);

    const cookie = loginResponse.get("Set-Cookie");
    const parsedCookie = cookie[0].match(/^(.+)=(.+); /); //extract cookie key and value
    if (!parsedCookie) throw Error("Bad regex");

    const refreshResponse = await api
      .post("/api/customers/refreshToken")
      .set("Cookie", [parsedCookie[0], parsedCookie[1]]);

    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.body.accessToken).toBe(
      auth.createAccessToken(email)
    );
  });
});
