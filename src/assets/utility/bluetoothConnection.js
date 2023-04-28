import { atob } from "react-native-quick-base64";

export function base64ToDecimal(encodedString) {
  // Convert base 64 encoded string to text
  var text = atob(encodedString);
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
  if (device === "O2Ring 0217") return "14839ac4-7d7e-415c-9a42-167340cf2339";
  if (device === "Vücut Analizi" || device === "EKG")
    return "0000ffb0-0000-1000-8000-00805f9b34fb";
};
export const receiveUUIDhandler = (device) => {
  if (device === "VTM AD5") return "0000FFE4-0000-1000-8000-00805F9B34FB";
  if (device === "Vücut Analizi") return "0000ffb2-0000-1000-8000-00805f9b34fb";
  if (device === "O2Ring 0217") return "0734594a-a8e7-4b1a-a6b1-cd5243059a57";
  if (device === "EKG") return "0734594a-a8e7-4b1a-a6b1-cd5243059a57";
};
