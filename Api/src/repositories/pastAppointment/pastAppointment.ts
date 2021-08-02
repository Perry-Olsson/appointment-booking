import { Prisma } from "@prisma/client";
import { PastAppointmentDAO } from "src/controllers/types";
import { prisma } from "../../prisma";

export class PastAppointmentDataAccess implements PastAppointmentDAO {
  async getPastAppointments(
    queryConditions?: Prisma.PastAppointmentFindManyArgs
  ) {
    const pastAppointments = prisma.pastAppointment.findMany(queryConditions);

    return pastAppointments;
  }
}
