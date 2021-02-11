import express from "express";
import { prisma } from "../app";

const router = express.Router();

router.get("/", async (_, res) => {
  const appointments = await prisma.appointment.findMany({
    orderBy: { timestamp: "asc" },
  });
  return res.json(appointments);
});

export { router as appointmentsRouter };
