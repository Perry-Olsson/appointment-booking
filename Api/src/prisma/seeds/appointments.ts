import { ONE_DAY } from "../../constants";
import { prisma } from "../../prisma";
import { NewAppointment } from "../../types";
import { createNewAppointment } from "./utils";

export async function seedAppointments(appointments: NewAppointment[]) {
  await prisma.appointment.deleteMany();

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointment.create({ data: appointments[i] });
  }

  await prisma.$disconnect();
}

export const createAppointments = (): NewAppointment[] => {
  const appointmentSeeds: NewAppointment[] = [];
  const initialAppointment = createInitialAppointment();
  let lastAppointment = initialAppointment;

  for (let i = 1; i < 11; i++) {
    const date = new Date(lastAppointment + ONE_DAY * getRandomNumber(1, 5));
    lastAppointment = date.getTime();
    appointmentSeeds.push(createNewAppointment(date));
  }
  return appointmentSeeds;
};

const createInitialAppointment = () => {
  const today = new Date();
  today.setHours(12);

  const initialAppointmentTimestamp = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours()
  );

  return initialAppointmentTimestamp.valueOf();
};

const getRandomNumber = (lowerBound = 0, upperBound = 10) => {
  return lowerBound + Math.ceil(Math.random() * upperBound);
};
