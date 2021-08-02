import express from "express";
import passport from "passport";
import { AppointmentController } from "../controllers";
import { AppointmentDataAccess } from "../repositories";

const appointmentController = new AppointmentController(
  new AppointmentDataAccess()
);

const router = express.Router();

router.get("/", (req, res, next) =>
  appointmentController.getAppointments(req, res, next)
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => appointmentController.createAppointment(req, res, next)
);

export { router as appointmentRouter };
