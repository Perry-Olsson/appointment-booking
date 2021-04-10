import express from "express";
import { appointmentController } from "../../controllers";

const router = express.Router();

router.get("/", appointmentController.getAppointments);

router.get("/:timestamp", appointmentController.getOneAppointment);

router.post("/", appointmentController.createAppointment);

export { router as appointmentsRouter };
