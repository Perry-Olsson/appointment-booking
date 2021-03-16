import { prisma } from "../../../prisma";
import { DuplicateError } from "../../../utils";
import { IsDuplicate } from "../types";

export const isDuplicate: IsDuplicate = async function ({ timestamp, end }) {
  const duplicateAppointment = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              timestamp: {
                lte: timestamp,
              },
            },
            {
              end: {
                gt: timestamp,
              },
            },
          ],
        },
        {
          AND: [
            {
              timestamp: {
                lt: end,
              },
            },
            {
              end: {
                gt: end,
              },
            },
          ],
        },
      ],
    },
  });

  if (duplicateAppointment.length)
    throw new DuplicateError("appointment", "timeslot has been taken");
};
