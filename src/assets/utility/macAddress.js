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
  "17:71:12:4B:BA:2D",
  "EF:47:12:59:2C:31",
  "F7:AE:65:C5:8B:9C",
  "C7:EE:2F:E4:F8:3E",
  "E8:1B:D5:51:EC:5A",
  "CE:27:D4:EB:12:F8",
  "F8:75:72:3D:A0:30",
  "D7:27:6E:0A:5F:B0",
  "E6:0B:3D:32:B8:BA",
  "E7:6D:D7:12:A2:01",
  "F5:62:96:4F:F2:BA",
  "FA:40:DD:1C:14:5D",
  "F7:5E:E8:A9:82:F1",
  "C9:E4:11:83:33:03",
  "C3:2A:2F:EF:F9:73",
  "E9:84:BA:BE:A7:4A",
  "0517F157-5188-9C75-A7B9-1ABA11667534",
  "80F9A264-3BD1-24CB-721F-7408675D3F53",
];
export const macAddressChecker = (id) => {
  const checker = macAddress.indexOf(id);
  if (checker == -1) {
    return false;
  } else {
    return true;
  }
};
export function convertBluetoothAddress(iosAddress) {
  // Remove all non-hexadecimal characters (including the dashes) from the iOS address
  iosAddress = iosAddress.replace(/[^0-9A-F]/gi, "");

  // Convert the first 6 bytes to the Android format (OUI)
  var androidOUI = iosAddress
    .substring(0, 6)
    .match(/.{1,2}/g)
    .join(":");

  // Convert the remaining bytes to the Android format (device identifier)
  var androidIdentifier = iosAddress
    .substring(6)
    .match(/.{1,2}/g)
    .join(":");

  // Concatenate the OUI and device identifier with a colon in between
  var androidAddress = androidOUI + ":" + androidIdentifier;

  return androidAddress;
}
