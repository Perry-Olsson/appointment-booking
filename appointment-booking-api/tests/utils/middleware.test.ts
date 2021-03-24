import request from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/prisma";
import {
  createDefaultTime,
  createTestAppointment,
  initializeTestData,
} from "../helpers";

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
    });

    const { data: offsetAppointment } = await createTestAppointment({
      time: {
        start: { ...defaultStart, hour: defaultStart.hour - 1 },
        finish: { ...defaultFinish, minute: defaultFinish.minute - 30 },
      },
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
    const response = await api.get("/api/appointments/invalidTimestamp");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid timestamp",
      message:
        "timestamp invalidTimestamp is invalid. Timestamp must be in json format",
    });
  });
});
