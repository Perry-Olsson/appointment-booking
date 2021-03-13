import { prisma } from "../../../prisma";
import { DuplicateError } from "../../../utils";
import { IsDuplicate } from "../types";

export const isDuplicate: IsDuplicate = async function (newAppointment) {
  const duplicateAppointment = await prisma.appointment.findUnique({
    where: { timestamp: newAppointment.timestamp },
  });

  if (duplicateAppointment)
    throw new DuplicateError("appointment", "timeslot has been taken");
};
