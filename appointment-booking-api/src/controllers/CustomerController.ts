import { NextFunction, Request, Response } from "express";
import { customer } from "../repositories";
import { EmailError } from "../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";

class CustomerController {
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await this.initialize(req.body);
      const response = await customer.create(newCustomer);

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
      const response = await customer.login(req.body);

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

export const customerController = new CustomerController();