import { Customer } from "../../src/repositories/Customer";
import bycrypt from "bcryptjs";

describe("Customer Creation", () => {
  test("Initialze function throws error if object isn't provided", async () => {
    await expect(Customer.initialize("hello")).rejects.toThrow();
  });

  test("Initialize function validates email address correctly", async () => {
    const validCustomer = await Customer.initialize(testUser);
    await expect(
      Customer.initialize({
        ...testUser,
        email: "invalidEmail",
      })
    ).rejects.toThrow();

    expect(validCustomer).toBeDefined();
  });

  test("Initialize function hashes user password and deletes guest password field", async () => {
    const user = await Customer.initialize({ ...testUser });
    const guest = await Customer.initialize({ ...testGuest });

    expect(guest.password).toBeUndefined();
    expect(user.password).toHaveLength(60);
    expect(
      await bycrypt.compare(testUser.password, user.password!)
    ).toBeTruthy();
  });

  test("Initialize returns a valid customer", async () => {
    const user = await Customer.initialize({ ...testUser });
    const guest = await Customer.initialize({ ...testGuest });

    expect(Object.keys(user).length).toBe(Object.keys(testUser).length);
    expect(Object.keys(guest).length).toBe(Object.keys(testGuest).length - 1);
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

const testGuest = {
  email: "bob@example.com",
  type: "GUEST",
  phoneNumber: "(123)-543-3212",
  password: null,
  firstName: "Bob",
  lastName: "Dull",
};
