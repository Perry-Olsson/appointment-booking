import express from "express";
import { ProcedureController } from "../controllers/ProcedureController";
import { ProcedureDataAccess } from "../repositories";

const procedureController = new ProcedureController(new ProcedureDataAccess());

const router = express.Router();

router.get("/", (req, res, next) =>
  procedureController.getProcedures(req, res, next)
);

export { router as procedureRouter };
