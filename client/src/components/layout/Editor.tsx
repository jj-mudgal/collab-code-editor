import Editor from "@monaco-editor/react";
import { socket } from "../../socket";
import { setupCursorManager } from "../../cursorManager";
import { useState, useCallback } from "react";
import { debounce } from "../../utils/debounce";

let isRemoteUpdate = false;

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const handleMount = useCallback((editor: any) => {
    setupCursorManager(editor);
  }, []);

  const sendChange = useCallback(
    debounce((val: string) => {
      socket.send(
        JSON.stringify({
          type: "code-change",
          code: val,
        })
      );
    }, 300),
    []
  );

  const handleChange = useCallback((value: string | undefined) => {
    if (isRemoteUpdate) {
      isRemoteUpdate = false;
      return;
    }

    if (value) {
      setCode(value);
      sendChange(value);
    }
  }, [sendChange]);

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
