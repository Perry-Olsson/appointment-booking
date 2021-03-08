import http from "http";
import { app } from "./app";
import config from "./config";

http.createServer(app).listen(config.port, () => {
  console.log(`server is listening on port ${config.port}`);
});
