import { setupCursorTracking } from "./cursor";
import { renderRemoteCursor } from "./remoteCursor";
import { socket } from "./socket";

export const setupCursorManager = (editor: any) => {
  setupCursorTracking(editor);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "cursor-move") {
      renderRemoteCursor(editor, data.line, data.column);
    }
  };
};
