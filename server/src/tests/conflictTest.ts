import { applyOperation } from "../../../client/src/ot";

const base = "hello";

const op1 = { type: "insert", index: 5, value: "!" };
const op2 = { type: "insert", index: 0, value: "X" };

let result = applyOperation(base, op1);
result = applyOperation(result, op2);

console.log("Final:", result);
