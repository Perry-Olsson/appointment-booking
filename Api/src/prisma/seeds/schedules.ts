import { prisma } from "../prisma";
import schedules from "./json/schedules.json";

export const seedSchedules = async () => {
  await prisma.schedule.createMany({ data: schedules });
};
