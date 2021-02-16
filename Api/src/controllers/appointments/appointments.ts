import express from "express";
import { Appointments } from "../../repositories/Appointments";

const router = express.Router();

router.get("/", async (req, res) => {
  const appointments = await Appointments.sorted.findMany({ where: req.query });

  res.json(appointments);
});

router.post("/", async (req, res) => {
  const newAppointment = Appointments.initialize(req.body);
  const createdAppointment = await Appointments.create({
    data: newAppointment,
  });

  res.json(createdAppointment);
});

export { router as appointmentsRouter };
