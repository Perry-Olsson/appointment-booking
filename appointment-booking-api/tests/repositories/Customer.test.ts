import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import { Customer } from "../../src/repositories/Customer";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer Creation", () => {
  test("Initialze function throws error if object isn't provided", () => {
    expect(() => Customer.initialize("hello")).toThrow();
  });

  test("Initialize function validates email address correctly", () => {
    const validCustomer = Customer.initialize(testUser);
    expect(() =>
      Customer.initialize({
        ...testUser,
        email: "invalidEmail",
      })
    ).toThrow();

    expect(validCustomer).toBeDefined();
  });
});

const testUser = {
  email: "steve@example.com",
  type: "USER",
  phoneNumber: "(60) 1416-4953",
  password: "steve12",
  firstName: "Steve",
  lastName: "Smith",
};
