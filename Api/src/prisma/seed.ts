import { PrismaClient } from "@prisma/client";
import { NewAppointment } from "../types";

const prisma = new PrismaClient();

export async function seedDatabase(appointments: NewAppointment[]) {
  await prisma.appointment.deleteMany();

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointment.create({ data: appointments[i] });
  }
  await prisma.$disconnect();
}

export const createAppointments = (): NewAppointment[] => {
  const today = new Date();
  const initialAppointment = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDay(),
    12
  );
  const oneDay = 1000 * 60 * 60 * 24;

  const appointmentSeeds: NewAppointment[] = [];

  let lastAppointment = initialAppointment;
  for (let i = 1; i < 11; i++) {
    const date = new Date(lastAppointment + oneDay * getRandomNumber(1, 5));
    date.setHours(12);
    date.setMinutes(0);
    date.setMilliseconds(0);
    lastAppointment = date.getTime();
    appointmentSeeds.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      timestamp: date,
    });
  }
  return appointmentSeeds;
};

const getRandomNumber = (lowerBound = 0, upperBound = 10) => {
  return lowerBound + Math.ceil(Math.random() * upperBound);
};
