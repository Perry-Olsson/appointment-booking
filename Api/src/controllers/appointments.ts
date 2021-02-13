import express from "express";
import { Appointments } from "../repositories/Appointments";

const router = express.Router();

router.get("/", async (_, res) => {
  const appointments = await Appointments.sorted.findMany();
  res.json(appointments);
});

router.get("/:month", async (req, res) => {
  const now = new Date();
  const month = Number(req.params.month);
  const year =
    now.getMonth() > month ? now.getFullYear() + 1 : now.getFullYear();

  const appointments = await Appointments.sorted.findMany({
    where: { month, year },
  });

  res.json(appointments);
});

export { router as appointmentsRouter };
