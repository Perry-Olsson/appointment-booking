import { myCors } from "./utils/middleware";
import express from "express";
import passport from "passport";
import {
  appointmentRouter,
  customerRouter,
  procedureRouter,
  providerRouter,
  serviceHoursRouter,
} from "./routers";
import { simulateSlowInternet } from "./utils";
import { unknownEndpoint } from "./utils/middleware";
import { errorHandler } from "./utils/middleware";
import { requestLogger } from "./utils/middleware";
import { jwtStrategy } from "./utils/middleware/JwtStrategy";
import cookieParser from "cookie-parser";
import "./utils/date.extensions";

const app = express();

app.use(myCors());
app.use(express.json());
app.use(cookieParser());
passport.use(jwtStrategy);

if (process.env.SLOW_INTERNET) app.use(simulateSlowInternet);

if (process.env.NODE_ENV === "development") app.use(requestLogger);

app.use("/api/appointments", appointmentRouter);
app.use("/api/customers", customerRouter);
app.use("/api/serviceHours", serviceHoursRouter);
app.use("/api/providers", providerRouter);
app.use("/api/procedures", procedureRouter);

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

app.use(errorHandler);
app.use(unknownEndpoint);

export { app };
