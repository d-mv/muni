const scrollCalculator = (
  direction: string = "LEFT" || "RIGHT",
  currentId: number,
  total: number
):number => {
  let id;
  // if swiping to the left
  if (direction === "LEFT") {
    if (currentId + 1 > total) {
      id = 0;
    } else {
      id = currentId + 1;
    }
    // if swiping to the right
  } else if (direction === "RIGHT") {
    if (currentId - 1 < 0) {
      id = total;
    } else {
      id = currentId - 1;
    }
  }
  return id || 0;
};

export { scrollCalculator };
