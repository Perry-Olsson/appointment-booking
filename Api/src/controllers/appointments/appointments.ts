import express from "express";
import { Appointments } from "../../repositories/Appointments";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const appointments = await Appointments.sorted.findMany({
      where: req.query,
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const newAppointment = Appointments.initialize(req.body);
  try {
    const createdAppointment = await Appointments.create({
      data: newAppointment,
    });

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
