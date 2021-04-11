import cors from "cors";
import express from "express";
import passport from "passport";
import {
  appointmentsRouter,
  customersRouter,
  providerRouter,
  serviceHoursRouter,
} from "./routers";
import { unknownEndpoint } from "./utils/middleware";
import { errorHandler } from "./utils/middleware";
import { requestLogger } from "./utils/middleware";
import { jwtStrategy } from "./utils/middleware/JwtStrategy";

const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);

if (process.env.NODE_ENV === "development") app.use(requestLogger);

app.use("/api/appointments", appointmentsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/serviceHours", serviceHoursRouter);
app.use("/api/providers", providerRouter);

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

app.use(errorHandler);
app.use(unknownEndpoint);

export { app };
