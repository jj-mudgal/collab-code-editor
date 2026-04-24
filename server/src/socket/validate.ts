export const validateMessage = (data: any) => {
  if (!data || typeof data !== "object") return false;

  const allowedTypes = ["join", "code-change", "execute", "request-sync"];

  if (!allowedTypes.includes(data.type)) return false;

  if (data.code && typeof data.code !== "string") return false;

  if (data.room && typeof data.room !== "string") return false;

  return true;
};
