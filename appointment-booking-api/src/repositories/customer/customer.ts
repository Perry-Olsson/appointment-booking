import { LoginError } from "../../utils";
import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";
import { DefaultCustomer, LoginCustomer } from "./types";
import { prisma } from "../../prisma";
import { defaultCustomerSelect } from "../constants";

export class CustomerDataAccess {
  public async create(reqBody: any): Promise<DefaultCustomer> {
    const createdCustomer = await prisma.customer.create({
      data: reqBody,
      select: this.createSelectStatement,
    });

    return createdCustomer;
  }

  public async login({ email, password }: any): Promise<DefaultCustomer> {
    const customer: LoginCustomer | null = await prisma.customer.findUnique({
      where: { email },
      select: this.loginSelectStatement,
    });

    const user = await this._isUser(customer, password);
    if (!user) throw new LoginError();

    return user;
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

  public async findOne(args: Prisma.CustomerFindUniqueArgs) {
    if (!args.select) args.select = defaultCustomerSelect;

    return await prisma.customer.findUnique(args);
  }

  public createSelectStatement = defaultCustomerSelect;

  public loginSelectStatement = { ...defaultCustomerSelect, password: true };
}
