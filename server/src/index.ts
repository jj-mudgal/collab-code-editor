import express from "express";
import http from "http";
import { setupWebSocket } from "./socket";

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.get("/", (_, res) => {
  res.send("Server running");
});

server.listen(5000, () => {
  console.log("Server on port 5000");
});
