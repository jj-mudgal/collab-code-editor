export type Operation = {
  type: "insert" | "delete";
  index: number;
  value?: string;
};

export const applyOperation = (text: string, op: Operation): string => {
  if (op.type === "insert") {
    return text.slice(0, op.index) + op.value + text.slice(op.index);
  }

  if (op.type === "delete") {
    return text.slice(0, op.index) + text.slice(op.index + 1);
  }

  return text;
};
