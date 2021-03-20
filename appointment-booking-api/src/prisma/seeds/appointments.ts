import { HALF_HOUR, HOUR, ONE_DAY } from "../../constants";
import { prisma } from "../../prisma";
import { NewAppointment, NewCustomer } from "../../types";
import { createInitialAppointment } from "./utils/createInitialAppointment";
import { createNewAppointment } from "./utils";
import { getRandomNumber } from "./utils/getRandomNumber";

export async function seedAppointments(appointments: NewAppointment[]) {
  await prisma.customer.create({ data: testUser });

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointment.create({ data: appointments[i] });
  }

  await prisma.$disconnect();
}

export const createAppointments = (
  daysWithAppointments: number,
  appointmentsPerDay: number
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

const testUser: NewCustomer = {
  email: "test@example.com",
  type: "USER",
  phoneNumber: "1234567890",
  password: "testPassword",
  firstName: "testFirstName",
  lastName: "testLastName",
};
