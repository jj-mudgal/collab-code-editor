import Editor from "@monaco-editor/react";
import { sendCodeChange } from "../../socket";
import { setupCursorManager } from "../../cursorManager";

let isRemoteUpdate = false;

const CodeEditor = () => {
  const handleMount = (editor: any) => {
    setupCursorManager(editor);
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
