import cors from "cors";
import express from "express";
import config from "./config";
import { appointmentsRouter } from "./controllers";
import { unknownEndpoint } from "./utils/middleware";
import { errorHandler } from "./utils/middleware";
import { requestLogger } from "./utils/middleware";

const app = express();

app.use(cors(config.cors));
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(requestLogger);

app.use("/api/appointments", appointmentsRouter);

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

app.use(errorHandler);
app.use(unknownEndpoint);

export { app };
