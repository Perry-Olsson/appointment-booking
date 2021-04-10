import { prisma } from "../../prisma";

class _ServiceHours {
  public async getServiceHours() {
    return await prisma.serviceHours.findMany({ orderBy: { day: "asc" } });
  }
}

export const serviceHours = new _ServiceHours();
