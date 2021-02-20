import express from "express";
import { Appointments } from "../../repositories/Appointments";
import { DuplicateError } from "../../utils";
import { isDuplicate } from "./utils";

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

router.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = req.params.timestamp;

    if (timestamp.length !== 24 || isNaN(Date.parse(timestamp))) {
      throw new InvalidTimestampError(
        `timestamp ${timestamp} is invalid. Timestamp must be in json format`
      );
    }

    const appointment = await Appointments.findUnique({ where: { timestamp } });

    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAppointment = Appointments.initialize(req.body);

    if (await isDuplicate(newAppointment)) {
      throw new DuplicateError("appointment", "timeslot has been taken");
    }

    const createdAppointment = await Appointments.create({
      data: newAppointment,
    });

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };

export class InvalidTimestampError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Invalid timestamp";
  }
}
