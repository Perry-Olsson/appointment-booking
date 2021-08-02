import { accessTokenExp } from "../../src/constants";
import { auth } from "../../src/utils/auth";
import { testUser } from "../constants";

test("create token function returns a valid token", async () => {
  const token = auth.createAccessToken(testUser.email);

  const decodedToken = auth.decodeAccessToken(token);

  expect(decodedToken.email).toBe(testUser.email);
  expect(decodedToken.exp - accessTokenExp).toBe(decodedToken.iat);
  expect(typeof token).toBe("string");
});

test("create refreshToken returns valid refresh token", async () => {
  const token = auth.createRefreshToken(testUser.email, 0);

  const decodedToken = auth.decodeRefreshToken(token);

  expect(decodedToken.email).toBe(testUser.email);
  expect(decodedToken).toHaveProperty("tokenVersion");
  expect(typeof token).toBe("string");
});
