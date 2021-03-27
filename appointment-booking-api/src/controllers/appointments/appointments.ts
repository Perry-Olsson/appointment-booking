import express from "express";
import { _appointment } from "../../repositories/appointment";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const appointments = await _appointment.findMany(req.query);

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/:timestamp", async (req, res, next) => {
  try {
    const appointment = await _appointment.findUnique(req);

    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAppointment = _appointment.initialize(req.body);

    await _appointment.isDuplicate(newAppointment);

    const createdAppointment = await _appointment.create(newAppointment);

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
