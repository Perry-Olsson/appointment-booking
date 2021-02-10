import http from "http";
import { app } from "./app";
import { port } from "./config";

http.createServer(app).listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
