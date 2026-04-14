import { Operation, applyOperation, transform } from "./ot";

let localOps: Operation[] = [];

export const applyRemoteOperation = (
  currentText: string,
  remoteOp: Operation
) => {
  let transformedOp = remoteOp;

  localOps.forEach((localOp) => {
    transformedOp = transform(localOp, transformedOp);
  });

  return applyOperation(currentText, transformedOp);
};

export const addLocalOperation = (op: Operation) => {
  localOps.push(op);
};
