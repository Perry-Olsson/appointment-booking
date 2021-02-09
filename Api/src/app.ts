import cors from "cors";
import express from "express";
import { appointmentsRouter } from "./controllers";
import { requestLogger } from "./utils/middleware";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(requestLogger);

app.use("/api/appointments", appointmentsRouter);

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

export default app;
