import {
  Appointment,
  Customer,
  Procedure,
  Provider,
  Schedule,
  ServiceHours,
} from "@prisma/client";
import { getDaysBetweenAppointments } from "./helpers";
import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import { timeStringRegExp } from "../../src/constants";

let appointments: Appointment[];
let customers: Customer[];
let providers: Provider[];
let procedures: Procedure[];
let schedules: Schedule[];
let serviceHours: ServiceHours[];

beforeAll(async () => {
  await initializeTestData();
  appointments = await prisma.appointment.findMany();
  customers = await prisma.customer.findMany();
  providers = await prisma.provider.findMany();
  procedures = await prisma.procedure.findMany();
  schedules = await prisma.schedule.findMany();
  serviceHours = await prisma.serviceHours.findMany();
});

afterAll(() => prisma.$disconnect());

describe("Database seeding", () => {
  test("Database is emptied and seeded", async () => {
    expect(appointments.length).toBeGreaterThan(1);
    expect(customers.length).toBeGreaterThan(1);
    expect(providers.length).toBeGreaterThan(1);
    expect(procedures.length).toBeGreaterThan(1);
    expect(schedules.length).toBeGreaterThan(1);
    expect(serviceHours.length).toBeGreaterThan(1);
  });

  test("appointment seeds are randomly assigned dates", async () => {
    const daysBetweenAppointments = getDaysBetweenAppointments(appointments);

    const isRandom = daysBetweenAppointments.some((val, i, arr) => {
      if (i !== arr.length - 1) return val !== arr[i + 1];
      return false;
    });

    expect(isRandom).toBeTruthy();
  });

  test("Appointments time is valid", async () => {
    const invalidTimes = appointments.filter(({ timestamp, end }) => {
      const startHour = timestamp.getHours();
      const startMinute = timestamp.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();

      const hour = (startHour + endHour) / 2;

      if (
        hour <= 24 &&
        hour >= 0 &&
        startMinute % 15 === 0 &&
        endMinute % 15 === 0
      )
        return false;
      return true;
    });

    expect(invalidTimes).toHaveLength(0);
  });
  test("Providers have correct procedures assigned", async () => {
    const provider = await prisma.provider.findFirst({
      include: { appointments: true, schedule: true, procedures: true },
    });
    if (!provider) throw Error("Something went wrong");

    const filtered = provider.appointments.filter(appointment => {
      if (provider.procedures.find(p => p.name === appointment.procedureId)) {
        return false;
      }
      return true;
    });

    expect(filtered).toHaveLength(0);
  });
  test("service hour times are in correct format", async () => {
    const hours = serviceHours.filter(
      day =>
        day.open.match(timeStringRegExp) && day.close.match(timeStringRegExp)
    );

    expect(hours).toHaveLength(7);
  });
});
