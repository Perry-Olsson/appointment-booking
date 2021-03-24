import { customer } from "../../src/repositories/customer";
import bycrypt from "bcryptjs";
import { testGuest, testUser } from "../constants";

describe("Customer Creation", () => {
  test("Initialze function throws error if object isn't provided", async () => {
    await expect(customer.initialize("hello")).rejects.toThrow();
  });

  test("Initialize function validates email address correctly", async () => {
    const validCustomer = await customer.initialize(testUser);
    await expect(
      customer.initialize({
        ...testUser,
        email: "invalidEmail",
      })
    ).rejects.toThrow();

    expect(validCustomer).toBeDefined();
  });

  test("Initialize function hashes user password and deletes guest password field", async () => {
    const user = await customer.initialize({ ...testUser });
    const guest = await customer.initialize({ ...testGuest });

    expect(guest.password).toBeUndefined();
    expect(user.password).toHaveLength(60);
    expect(
      await bycrypt.compare(testUser.password, user.password!)
    ).toBeTruthy();
  });

  test("Initialize returns a valid customer", async () => {
    const user = await customer.initialize({ ...testUser });
    const guest = await customer.initialize({ ...testGuest });

    expect(Object.keys(user).length).toBe(Object.keys(testUser).length);
    expect(Object.keys(guest).length).toBe(Object.keys(testGuest).length - 1);
  });

  test.only("create token function returns a valid token", async () => {
    const token = customer.createToken(testUser);
    expect(typeof token).toBe("string");
  });
});
