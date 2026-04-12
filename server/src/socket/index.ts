import { WebSocketServer } from "ws";

type Client = {
  ws: any;
  username: string;
  color: string;
};

const rooms: Record<string, Set<Client>> = {};

const randomName = () => "User" + Math.floor(Math.random() * 1000);
const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    let currentRoom = "";
    let client: Client;

    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        currentRoom = data.room;

        if (!rooms[currentRoom]) {
          rooms[currentRoom] = new Set();
        }

        client = {
          ws,
          username: randomName(),
          color: randomColor(),
        };

        rooms[currentRoom].add(client);

        rooms[currentRoom].forEach((c) => {
          c.ws.send(
            JSON.stringify({
              type: "notification",
              message: `${client.username} joined`,
            })
          );
        });
      }
    });

    ws.on("close", () => {
      if (currentRoom && rooms[currentRoom]) {
        rooms[currentRoom].forEach((c) => {
          if (c.ws === ws) {
            rooms[currentRoom].delete(c);

            rooms[currentRoom].forEach((c2) => {
              c2.ws.send(
                JSON.stringify({
                  type: "notification",
                  message: `${c.username} left`,
                })
              );
            });
          }
        });
      }
    });
  });
};
