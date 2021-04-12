import { LoginError } from "../../utils";
import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";
import { CustomerResponse, LoginCustomer } from "./types";
import { prisma } from "../../prisma";
import { auth } from "../../utils/auth";

class _Customer {
  public async create(reqBody: any): Promise<CustomerResponse> {
    const createdCustomer = await prisma.customer.create({
      data: reqBody,
      select: customer.createSelectStatement,
    });

    const token =
      createdCustomer.type === "USER"
        ? auth.createToken(createdCustomer.email)
        : null;

    return { customer: createdCustomer, token };
  }

  public async login({ email, password }: any): Promise<CustomerResponse> {
    const customer: LoginCustomer | null = await prisma.customer.findUnique({
      where: { email },
      select: this.loginSelectStatement,
    });

    const user = await this._isUser(customer, password);
    if (!user) throw new LoginError();

    return this._createLoginResponse(user);
  }

  private async _isUser(
    customer: LoginCustomer | null,
    password: string
  ): Promise<LoginCustomer | false> {
    if (!customer || !customer.password) return false;

    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) return false;
    return customer;
  }

  private _createLoginResponse(customer: LoginCustomer): CustomerResponse {
    const token = auth.createToken(customer.email);

    delete customer.password;
    return { customer, token };
  }

  public async findUnique(args: Prisma.CustomerFindUniqueArgs) {
    if (!args.select) args.select = this.defaultSelect;

    return await prisma.customer.findUnique(args);
  }

  public defaultSelect = {
    id: true,
    email: true,
    phoneNumber: true,
    type: true,
    firstName: true,
    lastName: true,
  };

  public createSelectStatement = this.defaultSelect;

  public loginSelectStatement = { ...this.defaultSelect, password: true };
}

export const customer = new _Customer();
