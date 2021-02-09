import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (_, res) => {
  const appointments = await prisma.appointment.findMany();
  return res.json(appointments);
});

export { router as appointmentsRouter };
