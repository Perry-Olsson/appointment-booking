import { EmailInUseError, LoginError } from "../../utils";
import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";
import { DefaultCustomer, LoginCustomer } from "./types";
import { prisma } from "../../prisma";
import { defaultCustomerSelect } from "../constants";
import { CustomerDAO } from "../../controllers/types";

export class CustomerDataAccess implements CustomerDAO {
  public async create(reqBody: any) {
    const customerWithSameEmail = await prisma.customer.findUnique({
      where: { email: reqBody.email },
    });

    if (customerWithSameEmail) {
      if (customerWithSameEmail.type === "USER") throw new EmailInUseError();
    }

    const createdCustomer = await prisma.customer.create({
      data: reqBody,
      select: this.createSelectStatement,
    });

    return createdCustomer;
  }

  public async login({ email, password }: any) {
    const customer: LoginCustomer | null = await prisma.customer.findUnique({
      where: { email },
      select: { ...this.loginSelectStatement, tokenVersion: true },
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

  public async getAppointments(customer: DefaultCustomer) {
    return await prisma.appointment.findMany({
      where: { customerId: customer.email },
    });
  }

  public createSelectStatement = defaultCustomerSelect;

  public loginSelectStatement = { ...defaultCustomerSelect, password: true };
}
