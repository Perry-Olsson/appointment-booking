import cors from "cors";
import express from "express";
import http from "http";

import { port } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_, res) => {
  res.send("pong");
});

http.createServer(app).listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
