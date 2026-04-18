export type Version = {
  id: string;
  timestamp: number;
  content: string;
  baseVersionId?: string;
};

export type Snapshot = {
  versionId: string;
  content: string;
};

export type Delta = {
  from: string;
  to: string;
};
