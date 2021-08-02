import { prisma } from "../../prisma";

export class ServiceHoursDataAccess {
  public async getServiceHours() {
    return await prisma.serviceHours.findMany({ orderBy: { day: "asc" } });
  }
}
