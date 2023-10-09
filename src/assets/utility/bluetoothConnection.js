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
  if (device.startsWith("O2Ring") || device.startsWith("DuoEK"))
    return "14839AC4-7D7E-415C-9A42-167340CF2339";
  if (device === "F8") return "0000ffb0-0000-1000-8000-00805f9b34fb";
};
export const receiveUUIDhandler = (device) => {
  if (device === "VTM AD5") return "0000FFE4-0000-1000-8000-00805F9B34FB";
  if (device === "F8") return "0000ffb2-0000-1000-8000-00805f9b34fb";
  if (device.startsWith("O2Ring"))
    return "0734594A-A8E7-4B1A-A6B1-CD5243059A57";
  if (device.startsWith("DuoEK")) return "0734594a-a8e7-4b1a-a6b1-cd5243059a57";
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
export function rearrangedArray(str) {
  let totalArray = [];
  for (let i = 0; i < str.length; i += 4) {
    const group = str.substr(i, 4);
    const item = group.slice(2) + group.slice(0, 2);
    let decimal = parseInt(item, 16);
    if (decimal > 32768) {
      decimal = decimal - 65535;
    }
    totalArray = [...totalArray, decimal];
  }
  return totalArray;
}
// export function calculateCRC8(hexString) {
//   const polynomial = 0x07; // CRC8 polynomial
//   let crc = 0;

//   for (let i = 0; i < hexString.length; i += 2) {
//     const byte = parseInt(hexString.substr(i, 2), 16);
//     crc ^= byte;
//     for (let j = 0; j < 8; j++) {
//       if (crc & 0x80) {
//         crc = (crc << 1) ^ polynomial;
//       } else {
//         crc <<= 1;
//       }
//     }
//   }

//   return crc.toString(16).toUpperCase().padStart(2, "0");
// }

export function calculateCRC8(hexString) {
  const polynomial = 0x07; // CRC8 polynomial
  let crc = 0;

  // Convert hex string to byte array
  const byteArray = hexString
    .match(/.{1,2}/g)
    .map((byte) => parseInt(byte, 16));

  // Calculate CRC8
  for (let i = 0; i < byteArray.length; i++) {
    crc ^= byteArray[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 0x80) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc <<= 1;
      }
    }
  }

  const crc8Hex = crc.toString(16).padStart(2, "0").toUpperCase(); // Convert CRC8 to uppercase hex string
  return "0x" + crc8Hex; // Add the "0x" prefix to the CRC8 value
}
function calculateCRC8New(hexString) {
  // Convert hex string to an array of bytes
  const byteArray = hexString.match(/.{1,2}/g).map((hex) => parseInt(hex, 16));

  const polynomial = 0x07; // CRC8 polynomial
  let crc = 0;

  byteArray.forEach((byte) => {
    crc ^= byte; // XOR byte with current CRC value

    for (let bit = 0; bit < 8; bit++) {
      if (crc & 0x80) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc <<= 1;
      }
    }
  });

  return crc & 0xff; // Return CRC8 value as a byte
}
let data;
export const firstDataArrayMaker = async (input) => {
  console.log("input in first data array maker 179", input);
  function processString() {
    var trimmedInput = input.slice(0, -1);
    var numbers = trimmedInput.split("");
    var result = numbers
      .map(function (number) {
        return "3" + number;
      })
      .join("");

    return "aa03fc00000f00" + result;
  }
  const pairs = await processString();
  console.log("192: ", pairs);
  data = pairs;
  const byteArray = await pairs
    .match(/.{1,2}/g)
    .map((byte) => parseInt(byte, 16));
  const result = await new Uint8Array(byteArray);
  return result;
};
export const secondDataArrayMaker = async (input) => {
  const lastChar = input.charAt(input.length - 1);
  data = data + 3 + lastChar + "00";
  const crcRe = calculateCRC8New(data);
  const first = "3" + lastChar;
  let result = [parseInt(first, 16), 0, crcRe];
  // const lastOne = input.slice(-1);
  // let result = "3" + lastOne + "00";
  // var numbers = input.split("");
  // var addedTree = numbers
  //   .map(function (number) {
  //     return "3" + number;
  //   })
  //   .join("");

  // const toConvertString = "aa03fc00000f00" + addedTree + "00";
  // console.log(
  //   "in 208 bluetooth connection:",
  //   calculateCRC8(toConvertString).slice(-2)
  // );
  // const crc8 = await calculateCRC8(toConvertString).slice(-2);
  // console.log("in 213 crc8:", crc8);
  // result = result + crc8;
  // console.log("in 215 last result ", result);
  // const byteArray = result.match(/.{1,2}/g).map((byte) => parseInt(byte, 16));
  // const lastResult = await new Uint8Array(byteArray);

  return result;
};
export function formatDateTime(input) {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  const hour = input.slice(8, 10);
  const minute = input.slice(10, 12);

  return `${year}/${month}/${day}    ${hour}:${minute}`;
}
export function hexToText(hex) {
  const cleanedHex = hex.replace(/[^0-9a-fA-F]/g, "");
  const bytes = [];
  for (let i = 0; i < cleanedHex.length; i += 2) {
    bytes.push(parseInt(cleanedHex.substr(i, 2), 16));
  }
  const text = String.fromCharCode(...bytes);
  return text;
}

function calculateCRC8ForByteArray(byteArray) {
  const polynomial = 0x07;
  let crc = 0;

  for (let i = 0; i < byteArray.length; i++) {
    let data = byteArray[i] ^ crc;
    for (let j = 0; j < 8; j++) {
      if (data & 0x80) {
        data = (data << 1) ^ polynomial;
      } else {
        data <<= 1;
      }
    }
    crc = data & 0xff; // Ensure that crc is within 8-bit range (0x00 to 0xFF)
  }

  return crc.toString(16).toUpperCase().padStart(2, "0");
}
export function createByteArray(counter) {
  const x = counter;
  const byteArrayWithoutY = new Uint8Array([
    0xaa,
    0x04,
    0xfb,
    x,
    0x00,
    0x00,
    0x00,
  ]);
  const y = calculateCRC8ForByteArray(byteArrayWithoutY);
  const byteArray = new Uint8Array([
    0xaa,
    0x04,
    0xfb,
    x,
    0x00,
    0x00,
    0x00,
    parseInt(y, 16),
  ]);
  console.log("output in data array maker:", byteArray);
  return byteArray;
}
