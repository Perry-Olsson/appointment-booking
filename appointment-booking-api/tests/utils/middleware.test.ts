import request from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/prisma";
import { EmailError, LoginError, TimestampError } from "../../src/utils";
import { auth } from "../../src/utils/auth";
import { johnsCredentials, testUser } from "../constants";
import {
  createDefaultTime,
  createTestAppointment,
  initializeTestData,
  logJohnIn,
} from "../helpers";
import { refreshTokenKeyValue } from "../../src/constants";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Error handler middleware", () => {
  test("Handles duplicate appointment error", async () => {
    const defaultStart = createDefaultTime();
    const defaultFinish = { ...defaultStart, hour: defaultStart.hour + 1 };
    const { data, appointment } = await createTestAppointment({
      time: { start: defaultStart, finish: defaultFinish },
      pushToDb: true,
      defaultProvider: true,
    });

    const { data: offsetAppointment } = await createTestAppointment({
      time: {
        start: { ...defaultStart, hour: defaultStart.hour - 1 },
        finish: { ...defaultFinish, minute: defaultFinish.minute - 30 },
      },
      defaultProvider: true,
    });

    const response = await api.post("/api/appointments").send(data);
    const offsetResponse = await api
      .post("/api/appointments")
      .send(offsetAppointment);

    expect(response.status).toBe(400);
    expect(offsetResponse.status).toBe(400);

    expect(response.body).toEqual({
      error: "Duplicate appointment",
      message: "timeslot has been taken",
    });
    expect(offsetResponse.body).toEqual({
      error: "Duplicate appointment",
      message: "timeslot has been taken",
    });

    await prisma.appointment.deleteMany({
      where: { id: appointment?.id },
    });
  });

  test("Handles invalid time error", async () => {
    const { data: valid } = await createTestAppointment({
      time: { start: { minute: 15 } },
    });
    const { data: invalidStart } = await createTestAppointment({
      time: { start: { minute: 17 } },
    });
    const { data: invalidFinish } = await createTestAppointment({
      time: { start: { minute: 30 }, finish: { minute: 35 } },
    });

    const validResponse = await api.post("/api/appointments").send(valid);
    const invalidStartResponse = await api
      .post("/api/appointments")
      .send(invalidStart);
    const invalidFinishResponse = await api
      .post("/api/appointments")
      .send(invalidFinish);

    expect(validResponse.status).toBe(200);
    expect(invalidStartResponse.status).toBe(400);
    expect(invalidFinishResponse.status).toBe(400);

    expect(invalidStartResponse.body).toEqual({
      error: "Invalid time",
      message: "Appointments must be scheduled and end at quarter hours",
    });
    expect(invalidFinishResponse.body).toEqual({
      error: "Invalid time",
      message: "Appointments must be scheduled and end at quarter hours",
    });

    await prisma.appointment.delete({ where: { id: validResponse.body.id } });
  });

  test("Provides Invalid timestamp response", async () => {
    const invalidTimestamp = "dsaifor90234";
    const response = await api.get(`/api/appointments/${invalidTimestamp}`);

    expect(response.status).toBe(400);

    const error = new TimestampError(invalidTimestamp);
    expect(response.body.message).toEqual(error.message);
  });

  test("Provides invalid login response", async () => {
    const { status, body } = await api
      .post("/api/customers/login")
      .send({ email: "invalid", password: "invalid" });

    expect(status).toBe(400);

    const error = new LoginError();
    expect(body.message).toBe(error.message);
  });

  test("Provides invalid email response", async () => {
    const invalidEmail = "fdsafw90r2";
    const { status, body } = await api
      .post("/api/customers")
      .send({ ...testUser, email: invalidEmail });

    expect(status).toBe(400);

    const error = new EmailError(invalidEmail);
    expect(body.message).toBe(error.message);
  });

  test("Provides not authenticated error", async () => {
    const response = await api.post("/api/customers/refreshToken");

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("Not authenticated");
  });

  test("Provides json web token error", async () => {
    const response = await api
      .post("/api/customers/refreshToken")
      .set("Cookie", `${refreshTokenKeyValue}=jfkldsajfpwijfoalsjfks`);

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({ error: "JsonWebTokenError" });
  });

  test("Provides user not found error", async () => {
    const refreshTokenForNonExistentUser = auth.createRefreshToken(
      "invalid@example.com",
      0
    );
    const response = await api
      .post("/api/customers/refreshToken")
      .set(
        "Cookie",
        `${refreshTokenKeyValue}=${refreshTokenForNonExistentUser}`
      );

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ error: "User not found" });
  });

  test("User with invalid token version can't get access token", async () => {
    const parsedCookie = await logJohnIn();

    await incrementTokenVersion();

    const refreshResponse = await api
      .post("/api/customers/refreshToken")
      .set("Cookie", `${parsedCookie[1]}=${parsedCookie[2]}`);

    expect(refreshResponse.status).toBe(403);
    expect(refreshResponse.body).toMatchObject({ error: "Token invalidated" });

    await decrementTokenVersion();
  });

  test("Registration with an in use email already associated with a user returns correct error", async () => {
    const response = await api.post("/api/customers").send({
      firstName: "John",
      lastName: "Doe",
      type: "USER",
      phoneNumber: "44444444444",
      email: "john@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ error: "Email in use" });
  });

  /* implement after email confirmation */
  // test.only("Registration with an email associated with a guest succeeds and updates database record", async () => {
  //   const createdGuest = await prisma.customer.create({
  //     data: testGuest as any,
  //   });

  //   const response = api.post("/api/customers").send({

  //   })

  //   await prisma.customer.delete({ where: { id: createdGuest.id } });
  // });
});

const incrementTokenVersion = async () => {
  await prisma.customer.update({
    where: { email: johnsCredentials.email },
    data: { tokenVersion: { increment: 1 } },
  });
};

const decrementTokenVersion = async () => {
  await prisma.customer.update({
    where: { email: johnsCredentials.email },
    data: { tokenVersion: { decrement: 1 } },
  });
};
