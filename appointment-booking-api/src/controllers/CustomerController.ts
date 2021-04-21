import { NextFunction, Request, Response } from "express";
import { EmailError } from "../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import { CustomerDAO } from "./types";

export class CustomerController {
  private dataAccess: CustomerDAO;

  constructor(dataAccess: CustomerDAO) {
    this.dataAccess = dataAccess;
  }
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await this.initialize(req.body);
      const response = await this.dataAccess.create(newCustomer);

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  public async initialize(reqBody: any): Promise<any> {
    if (!this._validateEmail(reqBody.email))
      throw new EmailError(reqBody.email);

    const initializedCustomer = await this._handlePassword(reqBody);

    return initializedCustomer;
  }

  private _validateEmail(email: any): boolean {
    return validator.validate(email);
  }

  private async _handlePassword(reqBody: any): Promise<any> {
    if (reqBody.type === "GUEST") delete reqBody.password;
    else {
      reqBody.password = await bcrypt.hash(reqBody.password, 8);
    }

    return reqBody;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.dataAccess.login(req.body);

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.user);
    } catch (err) {
      next(err);
    }
  }
}
