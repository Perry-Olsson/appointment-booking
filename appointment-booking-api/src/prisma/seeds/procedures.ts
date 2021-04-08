import { prisma } from "../prisma";
import procedures from "./json/procedures.json";

export const seedProcedures = async () => {
  for (let i = 0; i < procedures.length; i++) {
    await prisma.procedure.create({ data: procedures[i] });
  }
};
