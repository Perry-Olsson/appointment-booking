import { auth } from "../../src/utils/auth";
import customers from "../../src/prisma/seeds/json/customers.json";

export const getValidAuthHeader = () => ({
  Authorization: `bearer ${auth.createAccessToken(customers[0].email)}`,
});
