import { Request, Response, NextFunction } from "express";
import { ProcedureDataAccess } from "../repositories";

class ProcedureController {
  private dataAccess: ProcedureDataAccess;

  constructor(dataAccess: ProcedureDataAccess) {
    this.dataAccess = dataAccess;
  }

  async getProcedures(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.dataAccess.getProcedures());
    } catch (err) {
      next(err);
    }
  }
}

export const procedureController = new ProcedureController(
  new ProcedureDataAccess()
);
