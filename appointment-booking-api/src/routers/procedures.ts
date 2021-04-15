import express from "express";
import { procedureController } from "../controllers/ProceduresController";

const router = express.Router();

router.get("/", (req, res, next) =>
  procedureController.getProcedures(req, res, next)
);

export { router as procedureRouter };
