import express from "express";
import { appointment, _appointment } from "../../repositories/appointment";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { hasQueryString, start, end } = appointment.validateQuery(req.query);
    const appointments = await appointment.exposed.findMany(
      hasQueryString
        ? {
            AND: [
              {
                timestamp: {
                  gte: new Date(start),
                },
              },
              {
                timestamp: {
                  lt: new Date(end),
                },
              },
            ],
          }
        : {}
    );

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
    const newAppointment = _appointment.initialize(req.body);

    await _appointment.isDuplicate(newAppointment);

    const createdAppointment = await _appointment.create(newAppointment);

    res.json(createdAppointment);
  } catch (err) {
    next(err);
  }
});

export { router as appointmentsRouter };
