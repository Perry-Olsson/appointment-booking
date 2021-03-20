import { HALF_HOUR, HOUR, ONE_DAY } from "../../constants";
import { prisma } from "../../prisma";
import { NewAppointment, NewCustomer } from "../../types";
import { createInitialAppointment } from "./utils/createInitialAppointment";
import { createNewAppointment } from "./utils";

export async function seedAppointments(appointments: NewAppointment[]) {
  await prisma.customer.create({ data: testUser });

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointment.create({ data: appointments[i] });
  }

  await prisma.$disconnect();
}

export const createAppointments = (
  daysWithAppointments = 11,
  appointmentsPerDay = 2
): NewAppointment[] => {
  const appointmentSeeds: NewAppointment[] = [];
  const initialAppointment = createInitialAppointment();
  let previousDay = initialAppointment;

  for (let i = 0; i < daysWithAppointments; i++) {
    const day = new Date(previousDay + ONE_DAY * getRandomNumber(3));
    previousDay = day.valueOf();
    let appointment = day.valueOf();
    for (let i = 0; i < appointmentsPerDay; i++) {
      appointmentSeeds.push(
        createNewAppointment(
          new Date(appointment),
          new Date(appointment + HALF_HOUR * getRandomNumber(2))
        )
      );
      appointment += HOUR * getRandomNumber(2);
    }
  }
  return appointmentSeeds;
};

export const getRandomNumber = (upperBound = 10) => {
  return Math.ceil(Math.random() * upperBound);
};

const testUser: NewCustomer = {
  email: "test@example.com",
  type: "USER",
  phoneNumber: "1234567890",
  password: "testPassword",
  firstName: "testFirstName",
  lastName: "testLastName",
};
