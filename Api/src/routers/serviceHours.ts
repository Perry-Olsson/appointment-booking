import express from "express";
import { ServiceHoursController } from "../controllers";
import { ServiceHoursDataAccess } from "../repositories";

const serviceHoursController = new ServiceHoursController(
  new ServiceHoursDataAccess()
);

const router = express.Router();

router.get("/", (req, res, next) =>
  serviceHoursController.getServiceHours(req, res, next)
);

export { router as serviceHoursRouter };
