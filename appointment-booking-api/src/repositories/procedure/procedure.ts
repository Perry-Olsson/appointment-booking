import { Procedure } from ".prisma/client";
import { prisma } from "../../prisma";

export class ProcedureDataAccess {
  public async getProcedures(): Promise<Procedure[]> {
    return await prisma.procedure.findMany();
  }
}
