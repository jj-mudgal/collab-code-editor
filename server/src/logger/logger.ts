type LogLevel = "info" | "warn" | "error";

export const log = (level: LogLevel, message: string, meta?: any) => {
  const entry = {
    level,
    message,
    meta: meta || null,
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify(entry));
};
