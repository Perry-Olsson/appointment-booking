import { PrismaClient } from "@prisma/client";
import { oneDay } from "../constants";
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
  today.setHours(12);

  const initialAppointment = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDay(),
    today.getUTCHours()
  );

  const appointmentSeeds: NewAppointment[] = [];

  let lastAppointment = initialAppointment;
  for (let i = 1; i < 11; i++) {
    const date = new Date(lastAppointment + oneDay * getRandomNumber(1, 5));
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
