import { EmailError, RequestBodyError } from "../../utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";

class Customer {
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

  public createSelectStatement: Prisma.CustomerSelect = {
    id: true,
    email: true,
    phoneNumber: true,
    type: true,
    firstName: true,
    lastName: true,
    appointments: true,
  };
}

export const customer = new Customer();
