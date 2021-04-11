import { prisma } from "../../prisma";

class _Provider {
  public async getProviders() {
    return await prisma.provider.findMany({
      include: {
        schedule: true,
        procedures: true,
      },
    });
  }
}

export const provider = new _Provider();
