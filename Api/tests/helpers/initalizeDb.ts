import { createAppointments, seedAppointments } from "../../src/prisma/seeds";

export const initializeTestDb = async () => {
  await initializeAppointments();
};

export const initializeAppointments = async () => {
  const appointments = createAppointments();
  await seedAppointments(appointments);
};
