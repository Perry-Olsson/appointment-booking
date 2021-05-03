import { NextFunction, Request, Response } from "express";
import { EmailError, NotAuthenticatedError, UserNotFoundError } from "../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import { CustomerDAO } from "./types";
import { auth } from "../utils/auth";
import passport from "passport";
import { cookieOptions } from "../constants";

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

      res
        .cookie("renewal_center_refreshJwt", refreshToken, cookieOptions)
        .json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res
        .cookie("renewal_center_refreshJwt", "", cookieOptions)
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies["renewal_center_refreshJwt"];
      if (!refreshToken) throw new NotAuthenticatedError(200);

      const decodedToken = auth.decodeRefreshToken(refreshToken);

      const user = await this.dataAccess.findOne({
        where: { email: decodedToken.email },
      });

      //todo | create error
      if (!user)
        throw new UserNotFoundError(
          "We could not find a user associated with your credentials. Try logging in again",
          404
        );

      const accessToken = auth.createAccessToken(decodedToken.email);

      res.json({ accessToken });
    } catch (err) {
      if (err.name === "JsonWebTokenError") err.status = 403;
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(200).send("Unauthorized");
        return res.json(user);
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
