import { randomUUID } from "crypto";

type Version = {
  id: string;
  content?: string; // only for checkpoints
  delta?: string;   // diff from previous
  baseVersionId?: string;
  timestamp: number;
  isCheckpoint: boolean;
};

const versions: Version[] = [];
const CHECKPOINT_INTERVAL = 5;

export const createVersion = (content: string) => {
  const last = versions[versions.length - 1];

  let newVersion: Version;

  if (!last || versions.length % CHECKPOINT_INTERVAL === 0) {
    newVersion = {
      id: randomUUID(),
      content,
      timestamp: Date.now(),
      isCheckpoint: true,
    };
  } else {
    newVersion = {
      id: randomUUID(),
      delta: content,
      baseVersionId: last.id,
      timestamp: Date.now(),
      isCheckpoint: false,
    };
  }

  versions.push(newVersion);
  return newVersion;
};

export const getVersions = () => versions;
