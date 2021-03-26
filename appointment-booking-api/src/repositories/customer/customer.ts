import { EmailError, LoginError, RequestBodyError } from "../../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from ".prisma/client";
import config from "../../config";
import {
  Credentials,
  CustomerResponse,
  DecodedToken,
  LoginCustomer,
} from "./types";
import { prisma } from "../../prisma";

class _Customer {
  public async initialize(reqBody: any): Promise<Prisma.CustomerCreateInput> {
    if (typeof reqBody !== "object") throw new RequestBodyError(reqBody);

    if (!this._validateEmail(reqBody.email))
      throw new EmailError(reqBody.email);

    if (reqBody.type === "GUEST") delete reqBody.password;
    else {
      reqBody.password = await bcrypt.hash(reqBody.password, 8);
    }

    return reqBody as Prisma.CustomerCreateInput;
  }

  private _validateEmail(email: any): boolean {
    return validator.validate(email);
  }

  public async login({
    email,
    password,
  }: Credentials): Promise<CustomerResponse> {
    const customer: LoginCustomer | null = await prisma.customer.findUnique({
      where: { email },
      select: this.loginSelectStatement,
    });

    if (!customer || !this._isUser(customer, password)) throw new LoginError();

    return this._createLoginResponse(customer);
  }

  private _isUser(customer: LoginCustomer, password: string): boolean {
    if (!customer.password || !bcrypt.compare(password, customer.password))
      return false;
    return true;
  }

  private _createLoginResponse(customer: LoginCustomer): CustomerResponse {
    const token = this.createToken(customer.email);

    delete customer.password;
    return { customer, token };
  }

  public createToken(email: string) {
    return jwt.sign({ email }, config.jwtSecret);
  }

  public decodeToken(token: string) {
    const decodedToken = jwt.verify(token, config.jwtSecret) as DecodedToken;

    return decodedToken;
  }

  public defaultSelect = {
    id: true,
    email: true,
    phoneNumber: true,
    type: true,
    firstName: true,
    lastName: true,
    appointments: true,
  };

  public createSelectStatement = this.defaultSelect;

  public loginSelectStatement = { ...this.defaultSelect, password: true };
}

export const customer = new _Customer();
