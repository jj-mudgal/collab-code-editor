import { onEvent } from "./eventBus";
import { handleCodeChange, handleSyncRequest } from "../handlers/codeHandler";
import { handleCursor } from "../handlers/cursorHandler";
import { handleChat } from "../handlers/chatHandler";

export const registerHandlers = () => {
  onEvent("code-change", handleCodeChange);
  onEvent("request-sync", handleSyncRequest);
  onEvent("cursor-move", handleCursor);
  onEvent("chat", handleChat);
};
