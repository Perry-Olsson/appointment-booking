import { EmailError, RequestBodyError } from "../../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from ".prisma/client";
import config from "../../config";
import { DecodedToken } from "./types";

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

  public createToken(email: string) {
    return jwt.sign({ email }, config.jwtSecret);
  }

  public decodeToken(token: string) {
    const decodedToken = jwt.verify(token, config.jwtSecret) as DecodedToken;

    return decodedToken;
  }

  private _validateEmail(email: any): boolean {
    return validator.validate(email);
  }

  public createSelectStatement = {
    id: true,
    email: true,
    phoneNumber: true,
    type: true,
    firstName: true,
    lastName: true,
    appointments: true,
  };
}

export const customer = new _Customer();
