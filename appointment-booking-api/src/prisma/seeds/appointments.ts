import { HALF_HOUR, HOUR, ONE_DAY } from "../../constants";
import { prisma } from "../../prisma";
import { NewAppointment, NewCustomer } from "../../types";
import { createNewAppointment, getRandomNumber, timestamper } from "./utils";

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
  for (let i = 0; i < daysWithAppointments; i++) {
    timestamper.getNextTimestamp(ONE_DAY, 3);
    for (let i = 0; i < appointmentsPerDay; i++) {
      appointmentSeeds.push(
        createNewAppointment(
          new Date(timestamper.timeValue),
          new Date(timestamper.timeValue + HALF_HOUR * getRandomNumber(2))
        )
      );
      timestamper.getNextTimestamp(HOUR, 2);
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
