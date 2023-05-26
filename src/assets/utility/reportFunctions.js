//------------------- oxi functions --------------------
export const oxiReportMaker = (arr) => {
  let top = 0;
  let middle = 0;
  let down = 0;
  arr.map((item) => {
    if (item >= 95) top += 1;
    if (item < 95 && item >= 90) middle += 1;
    if (item > 95) down += 1;
  });
  return { top, middle, down };
};
export const heartReportMaker = (arr) => {
  let top = 0;
  let middle = 0;
  let down = 0;
  arr.map((item) => {
    if (item >= 120) top += 1;
    if (item < 120 && item >= 50) middle += 1;
    if (item < 50) down += 1;
  });
  return { top, middle, down };
};

export function findMinMax(numbers) {
  if (numbers.length === 0) {
    // Handle empty array
    return {
      min: undefined,
      max: undefined,
    };
  }

  let min = numbers[0];
  let max = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return {
    min: min,
    max: max,
  };
}
export function getAverage(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}
export function averageGroups(arr) {
  const result = [];

  if (arr.length <= 20) {
    // If the array is too short or too long, return an empty array

    return arr;
  } else if (arr.length <= 40) {
    // If the array has less than 40 elements, average each consecutive pair
    for (let i = 0; i < arr.length - 1; i += 2) {
      const pair = [arr[i], arr[i + 1]];
      const avg = getAverage(pair);
      result.push(avg);
    }
  } else if (arr.length <= 60) {
    // If the array has between 40 and 60 elements, average each consecutive triplet
    for (let i = 0; i < arr.length - 2; i += 3) {
      const triplet = [arr[i], arr[i + 1], arr[i + 2]];
      const avg = getAverage(triplet);
      result.push(avg);
    }
  } else if (arr.length <= 100) {
    // If the array has between 60 and 100 elements, average each consecutive group of 5
    for (let i = 0; i < arr.length - 4; i += 5) {
      const group = arr.slice(i, i + 5);
      const avg = getAverage(group);
      result.push(avg);
    }
  } else if (arr.length <= 200) {
    // If the array has between 100 and 200 elements, average each consecutive group of 10
    for (let i = 0; i < arr.length - 9; i += 10) {
      const group = arr.slice(i, i + 10);
      const avg = getAverage(group);
      result.push(avg);
    }
  } else if (arr.length <= 400) {
    // If the array has between 200 and 400 elements, average each consecutive group of 20
    for (let i = 0; i < arr.length - 19; i += 20) {
      const group = arr.slice(i, i + 20);
      const avg = getAverage(group);
      result.push(avg);
    }
  } else if (arr.length < 600) {
    // If the array has between 400 and 600 elements, average each consecutive group of 30
    for (let i = 0; i < arr.length - 29; i += 30) {
      const group = arr.slice(i, i + 30);
      const avg = getAverage(group);
      result.push(avg);
    }
  } else if (arr.length >= 600) {
    // If the array has more than 600 elements, average each consecutive group of 60
    for (let i = 0; i < arr.length - 59; i += 60) {
      const group = arr.slice(i, i + 60);
      const avg = getAverage(group);
      result.push(avg);
    }
  }
  return result;
}
