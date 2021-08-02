import express from "express";
import { ProviderController } from "../controllers";
import { ProviderDataAccess } from "../repositories";

const providerController = new ProviderController(new ProviderDataAccess());

const router = express.Router();

router.get("/", (req, res, next) =>
  providerController.getProviders(req, res, next)
);

export { router as providerRouter };
