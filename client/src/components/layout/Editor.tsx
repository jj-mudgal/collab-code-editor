import Editor from "@monaco-editor/react";
import { socket, sendCodeChange } from "../../socket";
import { setupCursorTracking } from "../../cursor";
import { renderRemoteCursor } from "../../remoteCursor";

let isRemoteUpdate = false;

const CodeEditor = () => {
  const handleMount = (editor: any) => {
    setupCursorTracking(editor);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "cursor-move") {
        renderRemoteCursor(editor, data.line, data.column);
      }

      if (data.type === "code-change") {
        isRemoteUpdate = true;
        editor.setValue(data.code);
      }
    };
  };

  const handleChange = (value: string | undefined) => {
    if (isRemoteUpdate) {
      isRemoteUpdate = false;
      return;
    }

    if (value) sendCodeChange(value);
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// start coding"
      onMount={handleMount}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
