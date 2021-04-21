import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

export default {
  port: process.env.PORT!,
  env: process.env.NODE_ENV!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  logError: process.env.LOG_ERROR,
};
