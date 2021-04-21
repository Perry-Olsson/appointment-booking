import express from "express";
import { AppointmentController } from "../controllers";
import { AppointmentDataAccess } from "../repositories";

const appointmentController = new AppointmentController(
  new AppointmentDataAccess()
);

const router = express.Router();

router.get("/", (req, res, next) =>
  appointmentController.getAppointments(req, res, next)
);

router.get("/:timestamp", (req, res, next) =>
  appointmentController.getOneAppointment(req, res, next)
);

router.post("/", (req, res, next) =>
  appointmentController.createAppointment(req, res, next)
);

export { router as appointmentRouter };
