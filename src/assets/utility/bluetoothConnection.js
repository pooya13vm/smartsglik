// import { atob } from "react-native-quick-base64";
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const Base64 = {
  // btoa: (input = "") => {
  //   let str = input;
  //   let output = "";

  //   for (
  //     let block = 0, charCode, i = 0, map = chars;
  //     str.charAt(i | 0) || ((map = "="), i % 1);
  //     output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  //   ) {
  //     charCode = str.charCodeAt((i += 3 / 4));

  //     if (charCode > 0xff) {
  //       throw new Error(
  //         "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
  //       );
  //     }

  //     block = (block << 8) | charCode;
  //   }

  //   return output;
  // },

  atob: (input = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};

export function base64ToDecimal(encodedString) {
  // Convert base 64 encoded string to text
  var text = Base64.atob(encodedString);
  var decimalArray = [];

  // Run a loop on all characters of the text and convert each character to decimal
  for (var i = 0; i < text.length; i++) {
    decimalArray.push(text.charAt(i).charCodeAt(0));
  }

  // Join all decimals to get the final decimal for the entire string
  return parseInt(decimalArray.join(""));
}
// dopp
// const SEND_SERVICE_UUID = "0000FFE5-0000-1000-8000-00805F9B34FB";
// const BOX_UUID = "0000FFE9-0000-1000-8000-00805F9B34FB";
// const RECEIVE_SERVICE_UUID = "0000FFE0-0000-1000-8000-00805F9B34FB";
// const MESSAGE_UUID = "0000FFE4-0000-1000-8000-00805F9B34FB";
// oximetre

// const uuids = {
//   F: {
//     SEND_SERVICE_UUID: "0000FFE5-0000-1000-8000-00805F9B34FB",
//     SEND_UUID: "0000FFE9-0000-1000-8000-00805F9B34FB",
//     RECEIVE_SERVICE_UUID: "0000FFE0-0000-1000-8000-00805F9B34FB",
//     RECEIVE_UUID: "0000FFE4-0000-1000-8000-00805F9B34FB",
//   },
//   O: {
//     SERVICE_UUID: "14839ac4-7d7e-415c-9a42-167340cf2339",
//     SEND_UUID: "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3",
//     RECEIVE_UUID: "0734594a-a8e7-4b1a-a6b1-cd5243059a57",
//   },
//   E: {
//     SERVICE_UUID: "14839ac4-7d7e-415c-9a42-167340cf2339",
//     SEND_UUID: "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3",
//     RECEIVE_UUID: "0734594a-a8e7-4b1a-a6b1-cd5243059a57",
//   },
//   V: {
//     SERVICE_UUID: "0000ffb0-0000-1000-8000-00805f9b34fb",
//     SEND_UUID: "0000ffb1-0000-1000-8000-00805f9b34fb",
//     RECEIVE_UUID: "0000ffb2-0000-1000-8000-00805f9b34fb",
//   },
// };
export const serviceUUIDhandler = (device) => {
  if (device === "VTM AD5") return "0000FFE0-0000-1000-8000-00805F9B34FB";
  if (device.startsWith("O2Ring"))
    return "14839AC4-7D7E-415C-9A42-167340CF2339";
  if (device === "Vücut Analizi" || device === "EKG")
    return "0000ffb0-0000-1000-8000-00805f9b34fb";
};
export const receiveUUIDhandler = (device) => {
  if (device === "VTM AD5") return "0000FFE4-0000-1000-8000-00805F9B34FB";
  if (device === "Vücut Analizi") return "0000ffb2-0000-1000-8000-00805f9b34fb";
  if (device.startsWith("O2Ring"))
    return "0734594A-A8E7-4B1A-A6B1-CD5243059A57";
  if (device === "EKG") return "0734594a-a8e7-4b1a-a6b1-cd5243059a57";
};
export function base64ToHex(base64) {
  // Convert base64 to a byte array
  const bytes = Base64.atob(base64)
    .split("")
    .map((char) => char.charCodeAt(0));

  // Convert byte array to hexadecimal string
  const hex = bytes
    .map((byte) => {
      return ("0" + byte.toString(16)).slice(-2);
    })
    .join("");

  return hex;
}
