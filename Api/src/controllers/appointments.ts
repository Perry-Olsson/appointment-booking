import express from "express";
import { prisma } from "../app";

const router = express.Router();

router.get("/", async (_, res) => {
  const appointments = await prisma.appointment.findMany({
    orderBy: { timestamp: "asc" },
  });
  res.json(appointments);
});

router.get("/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  const appointments = await prisma.appointment.findMany({
    orderBy: { timestamp: "asc" },
    where: { month: Number(month), year: Number(year) },
  });

  res.json(appointments);
});

export { router as appointmentsRouter };
