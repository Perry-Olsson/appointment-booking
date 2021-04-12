import { auth } from "../../src/utils/auth";
import { testUser } from "../constants";

test("create token function returns a valid token", async () => {
  const token = auth.createToken(testUser.email);

  const decodedToken = auth.decodeToken(token);

  expect(decodedToken.email).toBe(testUser.email);
  expect(typeof token).toBe("string");
});
