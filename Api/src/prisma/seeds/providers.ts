import { prisma } from "../prisma";
import providers from "./json/providers.json";

export const seedProviders = async () => {
  await prisma.provider.createMany({ data: providers });
};
