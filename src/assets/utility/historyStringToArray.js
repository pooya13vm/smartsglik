function removeOutliers(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i < 2 || i >= arr.length - 2) {
      // Keep the first two and last two elements
      result.push(arr[i]);
      continue;
    }

    const currentNumber = arr[i];
    const prevNumbers = arr.slice(i - 2, i);
    const nextNumbers = arr.slice(i + 1, i + 3);

    if (isOutlier(currentNumber, prevNumbers, nextNumbers)) {
      continue; // Skip the current number
    }

    result.push(currentNumber);
  }

  return result;
}

function isOutlier(current, prevNumbers, nextNumbers) {
  const minValidValue = current * (1 - 0.2);
  const maxValidValue = current * (1 + 0.2);

  // Count how many valid neighbors there are
  let validNeighbors = 0;

  for (const num of prevNumbers) {
    if (num >= minValidValue && num <= maxValidValue) {
      validNeighbors++;
    }
  }

  for (const num of nextNumbers) {
    if (num >= minValidValue && num <= maxValidValue) {
      validNeighbors++;
    }
  }

  // If there are less than 2 valid neighbors, consider it an outlier
  return validNeighbors < 2;
}
const patterns = [
  { pattern: "5500ff01", offset: 4 },
  { pattern: "5500ff02", offset: 0 },
  { pattern: "5500ff03", offset: -2 },
  { pattern: "5500ff04", offset: 2 },
  { pattern: "5500ff05", offset: -2 },
  { pattern: "5500ff06", offset: 4 },
  { pattern: "5500ff07", offset: 0 },
  { pattern: "5500ff08", offset: -2 },
  { pattern: "5500ff09", offset: 2 },
  { pattern: "5500ff0a", offset: -2 },
  { pattern: "5500ff0b", offset: 4 },
  { pattern: "5500ff0c", offset: 0 },
  { pattern: "5500ff0d", offset: -2 },
  { pattern: "5500ff0e", offset: 2 },
  { pattern: "5500ff0f", offset: -2 },
  { pattern: "5500ff10", offset: 4 },
  { pattern: "5500ff11", offset: 0 },
  { pattern: "5500ff12", offset: -2 },
  { pattern: "5500ff13", offset: 2 },
  { pattern: "5500ff14", offset: -2 },
  { pattern: "5500ff15", offset: 4 },
  { pattern: "5500ff16", offset: 0 },
  { pattern: "5500ff17", offset: -2 },
  { pattern: "5500ff18", offset: 2 },
  { pattern: "5500ff19", offset: -2 },
  { pattern: "5500ff1a", offset: 4 },
  { pattern: "5500ff1b", offset: 0 },
  { pattern: "5500ff1c", offset: -2 },
  { pattern: "5500ff1d", offset: 2 },
  { pattern: "5500ff1e", offset: -2 },
  { pattern: "5500ff1f", offset: 4 },
  { pattern: "5500ff20", offset: 0 },
  { pattern: "5500ff21", offset: -2 },
  { pattern: "5500ff22", offset: 2 },
  { pattern: "5500ff23", offset: -2 },
  { pattern: "5500ff24", offset: 4 },
  { pattern: "5500ff25", offset: 0 },
  { pattern: "5500ff26", offset: -2 },
  { pattern: "5500ff27", offset: 2 },
  { pattern: "5500ff28", offset: -2 },
  { pattern: "5500ff29", offset: 4 },
  { pattern: "5500ff2a", offset: 0 },
  { pattern: "5500ff2b", offset: 5 },
  { pattern: "5500ff2c", offset: 2 },
  { pattern: "5500ff2d", offset: -2 },
  { pattern: "5500ff2e", offset: 4 },
  { pattern: "5500ff2f", offset: 0 },
  { pattern: "5500ff30", offset: -2 },
  { pattern: "5500ff31", offset: 2 },
  { pattern: "5500ff32", offset: -2 },
  { pattern: "5500ff33", offset: 4 },
  { pattern: "5500ff34", offset: 0 },
  { pattern: "5500ff35", offset: -2 },
  { pattern: "5500ff36", offset: 2 },
  { pattern: "5500ff37", offset: -2 },
  { pattern: "5500ff38", offset: 4 },
  { pattern: "5500ff39", offset: 0 },
  { pattern: "5500ff3a", offset: -2 },
  { pattern: "5500ff3b", offset: 2 },
  { pattern: "5500ff3c", offset: -2 },
  { pattern: "5500ff3d", offset: 4 },
  { pattern: "5500ff3e", offset: 0 },
  { pattern: "5500ff3f", offset: -2 },
  { pattern: "5500ff40", offset: 2 },
  { pattern: "5500ff41", offset: -2 },
  { pattern: "5500ff42", offset: 4 },
  { pattern: "5500ff43", offset: 0 },
  { pattern: "5500ff44", offset: -2 },
  { pattern: "5500ff45", offset: 2 },
  { pattern: "5500ff46", offset: -2 },
  { pattern: "5500ff47", offset: 4 },
  { pattern: "5500ff48", offset: 0 },
  { pattern: "5500ff49", offset: -2 },
  { pattern: "5500ff4a", offset: 2 },
  { pattern: "5500ff4b", offset: -2 },
  { pattern: "5500ff4c", offset: 4 },
  { pattern: "5500ff4d", offset: 0 },
  { pattern: "5500ff4e", offset: -2 },
  { pattern: "5500ff4f", offset: 2 },
  { pattern: "5500ff50", offset: -2 },
  { pattern: "5500ff51", offset: 4 },
  { pattern: "5500ff52", offset: 0 },
  { pattern: "5500ff53", offset: -2 },
  { pattern: "5500ff54", offset: 2 },
  { pattern: "5500ff55", offset: -2 },
  { pattern: "5500ff56", offset: 4 },
  { pattern: "5500ff57", offset: 0 },
  { pattern: "5500ff58", offset: -2 },
  { pattern: "5500ff59", offset: 2 },
  { pattern: "5500ff5a", offset: -2 },
  { pattern: "5500ff5b", offset: 4 },
  { pattern: "5500ff5c", offset: 0 },
  { pattern: "5500ff5d", offset: -2 },
  { pattern: "5500ff5e", offset: 2 },
  { pattern: "5500ff5f", offset: -2 },
  { pattern: "5500ff60", offset: 4 },
  { pattern: "5500ff61", offset: 0 },
  { pattern: "5500ff62", offset: -2 },
  { pattern: "5500ff63", offset: 2 },
  { pattern: "5500ff64", offset: -2 },
];

export const historyStringToArray = (item) => {
  console.log("item in 105 history to array:", item);
  const oxi = [];
  const beat = [];
  let myString;
  const headCutIndex = item.indexOf("5500ff");
  if (headCutIndex !== -1) {
    myString = item.substring(headCutIndex);
  }
  const endCutIndex = myString.indexOf("ffff");
  if (endCutIndex !== -1) {
    myString = item.slice(0, endCutIndex);
  }

  if (myString.includes("5500ff00")) {
    const startIndex = myString.lastIndexOf("5500ff00");
    const endIndex = startIndex + 8 + 80;
    myString = myString.slice(0, startIndex) + myString.slice(endIndex);
  }
  while (myString.charAt(0) === "0") {
    myString = myString.substring(1);
  }
  const textString = parseInt(myString.slice(2, 4), 16);

  if (+textString > 180 || +textString < 50) {
    myString = myString.slice(40);
    while (myString.charAt(0) === "0") {
      myString = myString.substring(1);
    }
  }
  patterns.forEach((item) => {
    const { pattern, offset } = item;
    if (myString.includes(pattern)) {
      const startIndex = myString.indexOf(pattern) + offset;
      const endIndex = startIndex + 16;
      myString = myString.slice(0, startIndex) + myString.slice(endIndex);
    }
  });

  for (let i = 0; i < myString.length; i += 10) {
    const group = myString.substring(i, i + 10);

    if (group.length >= 2) {
      const char = group.substring(0, 2);
      oxi.push(parseInt(char, 16));
    }

    if (group.length >= 4) {
      const char2 = group.substring(2, 4);
      beat.push(parseInt(char2, 16));
    }
  }

  return { oxi: removeOutliers(oxi), beat: removeOutliers(beat) };
};
