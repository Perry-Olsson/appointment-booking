import { app } from "../../../src/app";
import request from "supertest";
import { prisma } from "../../../src/prisma";
import { extractRefreshToken, initializeTestData } from "../../helpers";
import { johnsCredentials, testGuest, testUser } from "../../constants";
import { auth } from "../../../src/utils/auth";
import { refreshTokenKeyValue } from "../../../src/constants";
import { logJohnIn } from "../../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer creation", () => {
  test.only("/api/customers creates a new user", async () => {
    const { status, body } = await api.post("/api/customers").send(testUser);
    const createdUser = await prisma.customer.findUnique({
      where: { email: testUser.email },
      include: { appointments: true },
    });
    if (!createdUser) throw Error("Customer was not created");

    expect(status).toBe(200);
    expect(body.password).toBeUndefined();
    expect(createdUser).toMatchObject(body);
    expect(body).toHaveProperty("appointments");

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
  test("/api/customers/login returns access token to valid user and sets refreshToken cookie", async () => {
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
    const refreshToken = extractRefreshToken(response.get("Set-Cookie"));
    if (!refreshToken) throw Error("bad regex");
    expect(refreshToken).toBe(auth.createRefreshToken(email, 0));
  });

  test("/api/customers/logout successfully sets refreshToken cookie to empty string", async () => {
    const response = await api
      .post("/api/customers/logout")
      .set("Cookie", `${refreshTokenKeyValue}=djfklsfsladfjasklfdjasklj`);

    const cookie = response.get("Set-Cookie");
    const refreshToken = cookie[0].match(/([^=]+)=(; )/); //matches empty string cookie
    expect(refreshToken).not.toBe(null);
  });
});

describe("Refresh token route", () => {
  test("User with valid refresh token can get access token", async () => {
    const parsedCookie = await logJohnIn();

    const refreshResponse = await api
      .post("/api/customers/refreshToken")
      .set("Cookie", `${parsedCookie[1]}=${parsedCookie[2]}`);

    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.body.accessToken).toBe(
      auth.createAccessToken(johnsCredentials.email)
    );
  });
});
