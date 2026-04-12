import { useState, useEffect } from "react";
import Editor from "./components/layout/Editor";
import UserList from "./components/users/UserList";
import { socket } from "./socket";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.send(JSON.stringify({ type: "join", room: "room1" }));

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "users") {
        setUsers(data.users);
      }
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <UserList users={users} />
      <Editor />
    </div>
  );
}

export default App;
