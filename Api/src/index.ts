import cors from "cors";
import express from "express";
import http from "http";
import { PrismaClient } from "@prisma/client";

import { port } from "./config";

export const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/ping", (_, res) => {
    res.send("pong");
  });

  http.createServer(app).listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
