import dotenv from "dotenv";
import { CookieOptions } from "express";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  expires: (() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    return now;
  })(),
});

export default {
  port: process.env.PORT!,
  env: process.env.NODE_ENV!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  logError: process.env.LOG_ERROR,
  cookieOptions,
};
