import cors from "cors";
import express from "express";
import { appointmentsRouter } from "./controllers";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";
import "express-async-errors";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(requestLogger);

app.use("/api/appointments", appointmentsRouter);

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

app.use(errorHandler);
app.use(unknownEndpoint);

export { app };
