let lastSaved = 0;
const THRESHOLD = 500; // ms

export const shouldSave = () => {
  const now = Date.now();
  if (now - lastSaved > THRESHOLD) {
    lastSaved = now;
    return true;
  }
  return false;
};
