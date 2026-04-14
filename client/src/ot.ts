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

export const transform = (op1: Operation, op2: Operation): Operation => {
  if (op1.type === "insert" && op2.type === "insert") {
    if (op1.index <= op2.index) {
      return { ...op2, index: op2.index + 1 };
    }
  }

  if (op1.type === "delete" && op2.type === "insert") {
    if (op1.index < op2.index) {
      return { ...op2, index: op2.index - 1 };
    }
  }

  return op2;
};
