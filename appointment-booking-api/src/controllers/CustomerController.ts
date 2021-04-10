import { NextFunction, Request, Response } from "express";
import { customer } from "../repositories";

class CustomerController {
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await customer.initialize(req.body);
      const response = await customer.create(newCustomer);

      res.json(response);
    } catch (err) {
      next(err);
    }
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
