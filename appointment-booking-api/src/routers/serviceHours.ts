import express from "express";
import { serviceHoursController } from "../controllers";

const router = express.Router();

router.get("/", (req, res, next) =>
  serviceHoursController.getServiceHours(req, res, next)
);

export { router as serviceHoursRouter };
