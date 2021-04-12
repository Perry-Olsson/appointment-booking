import express from "express";
import { providerController } from "../controllers";

const router = express.Router();

router.get("/", (req, res, next) =>
  providerController.getProviders(req, res, next)
);

export { router as providerRouter };
