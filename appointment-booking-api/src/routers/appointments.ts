import express from "express";
import { appointmentController } from "../controllers";

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

export { router as appointmentsRouter };
