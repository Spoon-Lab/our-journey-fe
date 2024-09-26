export const isEmptyArr = (arr: unknown[]) => {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }

  return false;
};
