import { CorsOptions } from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const cors: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://renewal-center-git-main-perry-olsson.vercel.app"
      : "*",
  optionsSuccessStatus: 200,
};

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  cors,
};
