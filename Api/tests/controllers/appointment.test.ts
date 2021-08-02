import { prisma } from "../../src/prisma";
import { createTestAppointment, initializeTestData } from "../helpers";
import { AppointmentController } from "../../src/controllers";
import { AppointmentDataAccess } from "../../src/repositories";
import { TimeError } from "../../src/utils";

const appointmentController = new AppointmentController(
  new AppointmentDataAccess()
);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Appointment creation", () => {
  test("Initialize function returns returns NewAppointment object from request", async () => {
    const { data } = await createTestAppointment();
    const initializedAppointment = appointmentController.initialize(
      JSON.parse(JSON.stringify(data))
    );

    expect(data).toMatchObject(initializedAppointment);
    expect(isNaN(data.timestamp.getDate())).toBe(false);
  });

  test("Initialize throws InvalidTime error", async () => {
    const { data: timestampWithInvalidMinutes } = await createTestAppointment();
    const { data: timestampWithNonZeroSeconds } = await createTestAppointment();
    const now = new Date();
    const { data: timestampInPast } = await createTestAppointment({
      time: new Date(now.getFullYear(), now.getMonth(), now.getUTCHours()),
    });
    timestampWithInvalidMinutes.timestamp.setMinutes(4);
    timestampWithNonZeroSeconds.timestamp.setSeconds(5);

    const initialize = jest.fn((appointment: any) =>
      appointmentController.initialize(appointment)
    );

    expect(() =>
      initialize(timestampsToJSON(timestampWithInvalidMinutes))
    ).toThrow(TimeError);
    expect(() =>
      initialize(timestampsToJSON(timestampWithNonZeroSeconds))
    ).toThrowError(TimeError);
    expect(() => initialize(timestampsToJSON(timestampInPast))).toThrow(
      TimeError
    );
  });
});

function timestampsToJSON(obj: any) {
  const newObj: any = {};
  for (let field in obj) {
    if (obj[field] instanceof Date) {
      newObj[field] = obj[field].toJSON();
    } else newObj[field] = obj[field];
  }
  return newObj;
}

describe("Query string is validated correctly", () => {
  test("validate field returns correct fields", () => {
    const validQuery = appointmentController.validateQuery(query);
    expect(validQuery).toEqual({
      start: start.valueOf(),
      end: end.valueOf(),
      hasQueryString: true,
    });
  });
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth());
  const end = new Date(now.getFullYear(), now.getMonth() + 1);

  const query = {
    start,
    end,
    invalid: "invalid",
  };
});
