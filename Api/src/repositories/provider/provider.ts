import { exposedAppointmentFields } from "../constants";
import { prisma } from "../../prisma";

export class ProviderDataAccess {
  public async getProviders() {
    return await prisma.provider.findMany({
      include: {
        schedule: true,
        procedures: true,
        appointments: {
          orderBy: { timestamp: "asc" },
          select: exposedAppointmentFields,
        },
      },
    });
  }
}
