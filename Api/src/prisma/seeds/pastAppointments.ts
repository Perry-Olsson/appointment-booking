import { transferPastAppointments } from "../../../src/utils/cron/transferPastAppointments";
import { HALF_HOUR, ONE_DAY } from "../../constants";
import { prisma } from "../prisma";
import { createNewAppointment } from "./utils";

export const seedPastAppointments = async () => {
  const pastAppointmentsTimestamps = [
    { timestamp: new Date(Date.now() - ONE_DAY), end: new Date() },
    { timestamp: new Date(Date.now() - ONE_DAY * 2), end: new Date() },
  ];

  await prisma.appointment.createMany({
    data: pastAppointmentsTimestamps.map(t => {
      t.timestamp.setUTCHours(17);
      t.timestamp.setUTCMinutes(0);
      t.end = new Date(t.timestamp.valueOf() + HALF_HOUR);
      return createNewAppointment({
        ...t,
        procedureId: "Botox",
        providerId: "john@provider.com",
      });
    }),
  });
  await transferPastAppointments();
};
