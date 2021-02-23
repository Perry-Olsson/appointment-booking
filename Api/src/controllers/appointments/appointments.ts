import express from "express";
import { Appointments } from "../../repositories/Appointments";
import { InvalidTimestampError } from "../../utils";
import { isInvalidTimestamp } from "./utils";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = Appointments.validateQuery(req.query);
    const appointments = await Appointments.sorted.findMany({ where });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = req.params.timestamp;

    if (isInvalidTimestamp(timestamp))
      throw new InvalidTimestampError(timestamp);

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

export { router as appointmentsRouter };
