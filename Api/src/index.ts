import http from "http";

import { port } from "./config";
import app from "./app";

http.createServer(app).listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
