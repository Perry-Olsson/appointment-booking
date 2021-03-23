import { EmailError, RequestBodyError } from "../../../src/utils";
import validator from "email-validator";
import { Prisma } from ".prisma/client";

//write password hash logic for USER type customers
class _Customer {
  public initialize(reqBody: any): Prisma.CustomerCreateInput {
    if (typeof reqBody !== "object") throw new RequestBodyError(reqBody);

    if (!this._validateEmail(reqBody.email))
      throw new EmailError(reqBody.email);

    return reqBody as Prisma.CustomerCreateInput;
  }

  private _validateEmail(email: any): boolean {
    return validator.validate(email);
  }
}

export const Customer = new _Customer();
