export const getNewCartId = (maxLength) => {
  if (maxLength < 1) {
    return 1;
  } else {
    return maxLength + 1;
  }
};
