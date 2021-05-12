import { prisma } from "./src/prisma";

const main = async () => {
  let retries = 5;

  while (retries !== 0) {
    try {
      await prisma.$connect();
      console.log("connected");
      retries = 0;
    } catch (err) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    }
  }
};
main().finally(() => prisma.$disconnect());
