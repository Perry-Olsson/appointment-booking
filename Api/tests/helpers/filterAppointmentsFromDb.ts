import { Appointment } from "@prisma/client";
import { Time } from "../../src/types";

export const filterAppointmentsFromDb = (
  appointments: Appointment[],
  time: Time
) => {
  return appointments.filter(a => {
    for (const subdivision in time) {
      switch (subdivision) {
        case "year":
          if (time[subdivision] !== a.timestamp.getFullYear()) return false;
          break;
        case "month":
          if (time[subdivision] !== a.timestamp.getMonth()) return false;
          break;
        case "day":
          if (time[subdivision] !== a.timestamp.getDate()) return false;
          break;
        case "hour":
          if (time[subdivision] !== a.timestamp.getHours()) return false;
          break;
        case "minute":
          if (time[subdivision] !== a.timestamp.getMinutes()) return false;
          break;
      }
    }
    return true;
  });
};
