import { PrismaClient } from "@prisma/client";
import { NewAppointment } from "../types";

const prisma = new PrismaClient();

export async function seedDatabase(appointments: NewAppointment[]) {
  await prisma.appointments.deleteMany();

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointments.create({ data: appointments[i] });
  }
  await prisma.$disconnect();
}

export const createAppointments = (): NewAppointment[] => {
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  const appointmentSeeds: NewAppointment[] = [];

  let lastAppointment = now;
  for (let i = 1; i < 11; i++) {
    const date = new Date(lastAppointment + oneDay * getRandomNumber(1, 5));
    lastAppointment = date.getTime();
    appointmentSeeds.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      time: 1200,
      timestamp: date,
    });
  }
  return appointmentSeeds;
};

const getRandomNumber = (lowerBound = 0, upperBound = 10) => {
  return lowerBound + Math.ceil(Math.random() * upperBound);
};
