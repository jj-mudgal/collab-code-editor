import { socket } from "./socket";

export const setupCursorTracking = (editor: any) => {
  editor.onDidChangeCursorPosition((e: any) => {
    const position = e.position;

    socket.send(
      JSON.stringify({
        type: "cursor-move",
        line: position.lineNumber,
        column: position.column,
      })
    );
  });
};
