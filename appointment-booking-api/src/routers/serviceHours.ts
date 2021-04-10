import express from "express";
import { serviceHoursController } from "../controllers";

const router = express.Router();

router.get("/", serviceHoursController.getServiceHours);

export { router as serviceHoursRouter };
