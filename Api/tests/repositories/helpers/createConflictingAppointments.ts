import schedules from "../../../src/prisma/seeds/json/schedules.json";
import { createDefaultTime } from "../../helpers";

export const createConflictingAppointments = () => {
  const providerSchedule = schedules[0];
  const time = createDefaultTime();
  const timestamp = new Date(
    Date.UTC(time.year, time.month, time.day, time.hour, time.minute)
  );

  while (timestamp.getDay() !== 1) timestamp.setDate(timestamp.getDate() + 1); //set day to monday

  const stamp1 = new Date(timestamp);
  stamp1.setUTCHours(19);
  const end1 = new Date(stamp1);
  end1.setUTCMinutes(end1.getMinutes() + 30);

  const stamp2 = new Date(timestamp);
  stamp2.setUTCHours(15);
  const end2 = new Date(timestamp);
  end2.setUTCHours(16);

  const stamp3 = new Date(timestamp);
  stamp3.setUTCHours(24);
  const end3 = new Date(timestamp);
  end3.setUTCHours(25);

  const stamp4 = new Date(timestamp);
  stamp4.setUTCHours(17);
  const end4 = new Date(timestamp);
  end4.setUTCHours(18);

  const appointment = {
    providerId: providerSchedule.providerId,
    procedureId: "Botox",
    customerId: "test@example.com",
  };

  return {
    before: { ...appointment, timestamp: stamp2, end: end2 },
    lunchHour: { ...appointment, timestamp: stamp1, end: end1 },
    after: { ...appointment, timestamp: stamp3, end: end3 },
    nonConflicting: { ...appointment, timestamp: stamp4, end: end4 },
  };
};
