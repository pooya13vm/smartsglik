const macAddress = [
  "18:71:05:0E:D8:F6",
  "17:71:12:4D:40:C2",
  "17:71:12:4E:C8:7B",
  "17:71:12:4B:BA:52",
  "17:71:12:4E:C7:71",
  "17:71:12:4E:C8:4E",
  "17:71:12:4E:C7:91",
  "17:71:12:4E:C7:DB",
  "17:71:12:4D:41:85",
  "17:71:12:4E:C8:0A",
  "17:71:12:4D:41:E5",
  "18:71:05:10:5B:B3",
  "17:71:12:4D:40:C0",
];
export const macAddressChecker = (id) => {
  const checker = macAddress.indexOf(id);
  if (checker == -1) {
    return false;
  } else {
    return true;
  }
};
