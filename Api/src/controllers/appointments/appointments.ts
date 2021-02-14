import express from "express";
import { Appointments } from "../../repositories/Appointments";

const router = express.Router();

router.get("/", async (req, res) => {
  const appointments = await Appointments.sorted.findMany({ where: req.query });
  res.json(appointments);
});

export { router as appointmentsRouter };
