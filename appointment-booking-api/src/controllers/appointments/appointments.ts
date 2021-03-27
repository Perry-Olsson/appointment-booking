import express from "express";
import { appointment } from "../../repositories/appointment";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const appointments = await appointment.findMany(req.query);

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/:timestamp", async (req, res, next) => {
  try {
    const _appointment = await appointment.findUnique(req);

    res.json(_appointment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAppointment = appointment.initialize(req.body);

    await appointment.isDuplicate(newAppointment);

    const createdAppointment = await appointment.create(newAppointment);

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
