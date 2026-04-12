import { useState, useEffect } from "react";
import Editor from "./components/layout/Editor";
import UserList from "./components/users/UserList";
import { socket } from "./socket";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.send(JSON.stringify({ type: "join", room: "room1" }));

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        setUsers(data.users);
      }

      if (data.type === "notification") {
        setMessages((prev) => [...prev, data.message]);
      }
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <UserList users={users} />
      <div>
        <Editor />
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
