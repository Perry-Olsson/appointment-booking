import { PrismaClient } from "@prisma/client";
import { NewAppointment } from "../types";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  const appointmentSeeds: NewAppointment[] = [];

  for (let i = 1; i < 11; i++) {
    const date = new Date(now + oneDay * i);
    appointmentSeeds.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      time: 1200,
      timestamp: date,
    });
  }

  await prisma.appointments.deleteMany();

  for (let i = 0; i < appointmentSeeds.length; i++) {
    await prisma.appointments.create({ data: appointmentSeeds[i] });
  }
  await prisma.$disconnect();
}
