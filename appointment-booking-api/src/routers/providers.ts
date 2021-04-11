import express from "express";
import { providerController } from "../controllers";

const router = express.Router();

router.get("/", providerController.getProviders);

export { router as providerRouter };
