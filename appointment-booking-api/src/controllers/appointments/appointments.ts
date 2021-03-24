import express from "express";
import { appointment } from "../../repositories/appointment";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = appointment.validateQuery(req.query);
    const appointments = await appointment.exposed.findManyRaw({
      args: where,
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = appointment.validateTimestamp(req.params.timestamp);

    const createdAppointment = await appointment.exposed.findUnique({
      where: { timestamp },
    });

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAppointment = appointment.initialize(req.body);

    await appointment.isDuplicate(newAppointment);

    const createdAppointment = await appointment.create({
      data: newAppointment,
    });

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
