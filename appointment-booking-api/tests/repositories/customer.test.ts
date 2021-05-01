import { CustomerDataAccess } from "../../src/repositories/customer";
import { testGuest, testUser } from "../constants";
import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import customers from "../../src/prisma/seeds/json/customers.json";
import { CustomerController } from "../../src/controllers";

const customer = new CustomerDataAccess();
const customerController = new CustomerController(customer);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer Creation", () => {
  test("create function return valid customer", async () => {
    const initializeCustomer = await customerController.initialize({
      ...testUser,
    });
    const createdCustomer = await customer.create(initializeCustomer);
    expect(createdCustomer).toHaveProperty("id");
    expect(createdCustomer.email).toBe(testUser.email);

    await prisma.customer.delete({
      where: { id: createdCustomer.id },
    });
  });
});

describe("Customer login", () => {
  test("Login function returns customer for valid user", async () => {
    const newCustomer = await prisma.customer.create({
      data: await customerController.initialize({ ...testUser }),
      include: { appointments: true },
    });
    const { email, password } = testUser;
    const customerResponse = await customer.login({ email, password });

    expect(newCustomer).toMatchObject(customerResponse);

    await prisma.customer.delete({ where: { id: newCustomer.id } });
  });

  test("Login function returns throw error on invalid credentials", async () => {
    const email = "invalid";
    const password = "invalid";

    await expect(customer.login({ email, password })).rejects.toThrow();
  });

  test("Login function throws when given valid guest input", async () => {
    const newGuest = await prisma.customer.create({
      data: await customerController.initialize({ ...testGuest }),
    });

    const { email } = testGuest;

    await expect(customer.login({ email, password: "" })).rejects.toThrow();

    await prisma.customer.delete({ where: { id: newGuest.id } });
  });
});

describe("miscellaneous", () => {
  test("findUnique returns correct fields", async () => {
    const _customer = await customer.findOne({
      where: { email: customers[0].email },
    });
    const customerPassword = await customer.findOne({
      where: { email: customers[0].email },
      select: { password: true },
    });
    if (!_customer || !customerPassword) throw new Error("Customer not found");

    expect(_customer.email).toBe(customers[0].email);
    expect(_customer.password).toBeUndefined();
    expect(customerPassword.password).toHaveLength(60);
  });
});
