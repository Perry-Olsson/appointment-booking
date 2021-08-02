import { Request, Response, NextFunction } from "express";
import { ProcedureDAO } from "./types";

export class ProcedureController {
  private dataAccess: ProcedureDAO;

  constructor(dataAccess: ProcedureDAO) {
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
