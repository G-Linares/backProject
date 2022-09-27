export const getNewId = (maxLength) => {
  if (maxLength < 1) {
    return 1;
  } else {
    return maxLength + 1;
  }
};

export function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
}
