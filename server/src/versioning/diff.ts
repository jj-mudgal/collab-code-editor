export const computeDelta = (prev: string, curr: string) => {
  let delta = "";

  for (let i = 0; i < curr.length; i++) {
    if (curr[i] !== prev[i]) {
      delta += curr[i];
    }
  }

  return delta;
};
