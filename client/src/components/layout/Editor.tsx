import Editor from "@monaco-editor/react";
import { socket } from "../../socket";
import { setupCursorManager } from "../../cursorManager";
import { useState } from "react";
import { debounce } from "../../utils/debounce";

let isRemoteUpdate = false;

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleMount = (editor: any) => {
    setupCursorManager(editor);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "execution-result") {
      setOutput(data.output);
    }
  };

  const sendChange = debounce((val: string) => {
    socket.send(
      JSON.stringify({
        type: "code-change",
        code: val,
      })
    );
  }, 300);

  const handleChange = (value: string | undefined) => {
    if (isRemoteUpdate) {
      isRemoteUpdate = false;
      return;
    }

    if (value) {
      setCode(value);
      sendChange(value);
    }
  };

  const runCode = () => {
    socket.send(
      JSON.stringify({
        type: "execute",
        code,
        language: "javascript",
      })
    );
  };

  return (
    <div>
      <button onClick={runCode}>Run</button>
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// start coding"
        onMount={handleMount}
        onChange={handleChange}
      />
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
