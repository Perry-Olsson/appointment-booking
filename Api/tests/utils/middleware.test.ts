import request from "supertest";

import { app } from "../../app";
import { NewAppointment } from "../../types";

const api = request(app);

describe("Error handler middleware", () => {
  test("Handles duplicate appointment error from database", async () => {
    const response = await api.post("/api/appointmnets").send();
  });
});

const createAppointmentTimestamp = (time: Partial<NewAppointment>): Date => {
  const now = new Date();

  const year = time.year || now.getFullYear();
  const month = time.month || now.getMonth() + 1;
  const day = time.day || 15;
  const hour = time.hour || 10;
  const minute = time.minute || 30;

  return new Date(year, month, day, hour, minute);
};

interface TimestampArg {
  year;
}
