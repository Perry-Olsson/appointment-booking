import { prisma } from "../prisma";

const main = async () => {
  const appointments = await prisma.customer.findMany({
    include: {
      appointments: true,
    },
  });
  console.log(appointments[4]);
};

main().finally(() => prisma.$disconnect());
