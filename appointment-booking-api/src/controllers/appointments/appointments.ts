import express from "express";
import { Appointments } from "../../repositories/Appointments";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = Appointments.validateQuery(req.query);
    const appointments = await Appointments.sorted.findManyRaw(where);

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = req.params.timestamp;

    Appointments.validateNewAppointment(timestamp);

    const appointment = await Appointments.findUnique({ where: { timestamp } });

    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAppointment = Appointments.initialize(req.body);

    await Appointments.isDuplicate(newAppointment);

    const createdAppointment = await Appointments.create({
      data: newAppointment,
    });

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

router.delete("/:timestamp", async (req, res, next) => {
  try {
    const { timestamp } = req.params;

    Appointments.validateNewAppointment(timestamp);

    await Appointments.delete({ where: { timestamp } });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
