import { applyRemoteOperation, addLocalOperation } from "./sync";
import { socket } from "./socket";

export const setupSync = (editor: any) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "operation") {
      const current = editor.getValue();
      const updated = applyRemoteOperation(current, data.op);
      editor.setValue(updated);
    }
  };
};

export const sendOperation = (op: any) => {
  addLocalOperation(op);

  socket.send(
    JSON.stringify({
      type: "operation",
      op,
    })
  );
};
