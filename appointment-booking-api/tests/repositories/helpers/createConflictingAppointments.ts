import schedules from "../../../src/prisma/seeds/json/schedules.json";
import { createDefaultTime } from "../../helpers";

export const createConflictingAppointments = () => {
  const providerSchedule = schedules[0];
  const time = createDefaultTime();
  const timestamp = new Date(
    time.year,
    time.month,
    time.day,
    time.hour,
    time.minute
  );
  while (timestamp.getDay() !== 1) timestamp.setDate(timestamp.getDate() + 1);
  timestamp.setHours(
    Number(
      providerSchedule.Monday[1].substr(
        0,
        providerSchedule.Monday[1].indexOf(":")
      )
    )
  );

  timestamp.setMinutes(
    Number(
      providerSchedule.Monday[1].substr(
        providerSchedule.Monday[1].indexOf(":") + 1
      )
    )
  );
  const stamp1 = timestamp;
  const end1 = stamp1;
  end1.setMinutes(end1.getMinutes() + 30);

  const stamp2 = new Date(timestamp);
  stamp2.setHours(8);
  const end2 = new Date(timestamp);
  end2.setHours(9);

  const stamp3 = new Date(timestamp);
  stamp3.setHours(17);
  const end3 = new Date(timestamp);
  end3.setHours(18);

  const stamp4 = new Date(timestamp);
  stamp4.setHours(10);
  const end4 = new Date(timestamp);
  end4.setHours(11);

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
