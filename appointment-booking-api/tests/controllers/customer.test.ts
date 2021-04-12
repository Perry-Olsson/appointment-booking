import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import { customerController } from "../../src/controllers";
import { testGuest, testUser } from "../constants";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Customer creation", () => {
  test("Initialze function throws error if object isn't provided", async () => {
    await expect(customerController.initialize("hello")).rejects.toThrow();
  });

  test("Initialize function validates email address correctly", async () => {
    const validCustomer = await customerController.initialize({ ...testUser });
    await expect(
      customerController.initialize({
        ...testUser,
        email: "invalidEmail",
      })
    ).rejects.toThrow();

    expect(validCustomer).toBeDefined();
  });

  test("Initialize function hashes user password and deletes guest password field", async () => {
    const user = await customerController.initialize({ ...testUser });
    const guest = await customerController.initialize({ ...testGuest });

    expect(guest.password).toBeUndefined();
    expect(user.password).toHaveLength(60);
    expect(
      await bcrypt.compare(testUser.password, user.password!)
    ).toBeTruthy();
  });

  test("Initialize returns a valid customer", async () => {
    const user = await customerController.initialize({ ...testUser });
    const guest = await customerController.initialize({ ...testGuest });

    expect(Object.keys(user).length).toBe(Object.keys(testUser).length);
    expect(Object.keys(guest).length).toBe(Object.keys(testGuest).length - 1);

    const match = await bcrypt.compare(testUser.password, user.password!);
    expect(match).toBe(true);
  });
});
