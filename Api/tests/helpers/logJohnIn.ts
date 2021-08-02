import supertest from "supertest";
import { app } from "../../src/app";
import { johnsCredentials } from "../constants";

const api = supertest(app);

export const logJohnIn = async (): Promise<string[]> => {
  const { email, password } = johnsCredentials;
  const loginResponse = await api
    .post("/api/customers/login")
    .send({ email, password });

  expect(loginResponse.status).toBe(200);

  const cookie = loginResponse.get("Set-Cookie");
  const parsedCookie = cookie[0].match(/([^;]+)=([^;]+); /); //extract cookie key and value
  if (!parsedCookie) throw Error("Bad regex");

  return parsedCookie;
};
