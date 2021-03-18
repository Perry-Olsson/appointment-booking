import { Prisma, PrismaClient } from "@prisma/client";
import config from "../config";

const log: (Prisma.LogLevel | Prisma.LogDefinition)[] | undefined =
  config.env === "development" ? ["query", "info", "warn", "error"] : undefined;

export const prisma = new PrismaClient({
  log,
});
