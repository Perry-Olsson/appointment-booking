import { Prisma, PrismaClient } from "@prisma/client";

const log: (Prisma.LogLevel | Prisma.LogDefinition)[] | undefined =
  process.env.NODE_ENV === "development"
    ? ["query", "info", "warn", "error"]
    : undefined;

export const prisma = new PrismaClient({
  log,
});
