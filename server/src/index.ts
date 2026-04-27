import express from "express";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./socket";

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "*", // change to frontend URL in production
}));

setupWebSocket(server);

app.get("/", (_, res) => {
  res.send("Server running");
});

server.listen(5000, () => {
  console.log("Server on port 5000");
});
