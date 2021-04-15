import { prisma } from "../../prisma";

class _Procedure {
  public async getProcedures() {
    return await prisma.procedure.findMany();
  }
}

export const procedure = new _Procedure();
