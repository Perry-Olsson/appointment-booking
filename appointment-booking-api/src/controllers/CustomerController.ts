import { NextFunction, Request, Response } from "express";
import { EmailError, NotAuthenticatedError } from "../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import { CustomerDAO } from "./types";
import { auth } from "../utils/auth";
import { refreshTokens } from "../utils/refreshTokens";

export class CustomerController {
  private dataAccess: CustomerDAO;

  constructor(dataAccess: CustomerDAO) {
    this.dataAccess = dataAccess;
  }
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await this.initialize(req.body);
      const customer = await this.dataAccess.create(newCustomer);

      res.json(customer);
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
      const user = await this.dataAccess.login(req.body);

      const accessToken = auth.createAccessToken(user.email);
      const refreshToken = auth.createRefreshToken(user.email);
      refreshTokens[refreshToken] = true;

      res
        .cookie("renewal_center_refreshJwt", refreshToken)
        .json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies["renewal_center_refreshJwt"];
      if (!refreshToken) throw new NotAuthenticatedError(401);

      auth.checkRefreshToken(refreshToken);

      const decodedToken = auth.decodeRefreshToken(refreshToken);
      const accessToken = auth.createAccessToken(decodedToken.email);

      res.json({ accessToken });
    } catch (err) {
      if (err.name === "JsonWebTokenError")
        res.status(403).json({ error: err.name, message: err.message });
      else next(err);
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
