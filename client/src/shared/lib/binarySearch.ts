export const binarySearch = <T>(array: T[], item: T): T | null => {
  let low = 0;
  let high = array.length - 1;

  if (array.length === 0) {
    return null;
  }

  while (low <= high) {
    let middle = Math.floor((high + low) / 2);
    let value = array[middle];

    if (value === item) {
      return value;
    }

    if (value > item) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  return null;
};
