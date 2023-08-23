import { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  LogBox,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
  AppState,
  FlatList,
} from "react-native";
import { AppContext } from "../context/mainContext";
import Lottie from "lottie-react-native";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { requestMultiple, PERMISSIONS } from "react-native-permissions";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import backgroundServer from "react-native-background-actions";
import { Feather } from "@expo/vector-icons";

// customize components import
import {
  base64ToHex,
  receiveUUIDhandler,
  serviceUUIDhandler,
  firstDataArrayMaker,
  secondDataArrayMaker,
  formatDateTime,
  hexToText,
  createByteArray,
} from "../assets/utility/bluetoothConnection";
import ChooseDeviceModal from "../components/ChooseDeviceModal";
import ScreenLayout from "../components/ScreenLayout";
import { Header } from "../components/Header";
import DoppDisconnect from "../PanelComponents/DoppDisconnect";
import DoppConnect from "../PanelComponents/DoppConnect";
import EKGConnect from "../PanelComponents/EKGConnect";
import EKGDisconnect from "../PanelComponents/EKGDisconnect";
import OximConnect from "../PanelComponents/OximConnect";
import OximDisconnect from "../PanelComponents/OximDisconnect";
import VAConnect from "../PanelComponents/VAConnect";
import VADisconnect from "../PanelComponents/VADisconnect";
import ModalContainer from "../components/ModalContainer";
import { SubmitBtn } from "../components/SubmitBtn";
import { TitleText } from "../components/TitleText";
import { colors } from "../assets/utility/colors";
import { macAddressChecker } from "../assets/utility/macAddress";
import { MainScreensContainer } from "../styles";
import ShareBtn from "../components/ShareBtn";

const BLTManager = new BleManager();
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();
let OxiInterval;
const options = {
  taskName: "Example",
  taskTitle: "Yüzük Oksimetre çalışıyor",
  taskDesc: "",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "yourSchemeHere://chat/jane", // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
  notificationTitle: "", // Empty string to hide the notification
  notificationText: "", // Empty string to hide the notification
};

const Panel = (props) => {
  const characteristicRef = useRef("");
  const {
    device,
    setDevice,
    saveDeviceToStorage,
    activeUserHandler,
    setMessage,
    setOxiPer,
    setHeartBeat,
    heartBeat,
    oxiPer,
    activeUser,
    // setHistoryArray,
    isConnected,
    setConnected,
    saveHistoryItemToStorage,
    userUpdated,
  } = useContext(AppContext);
  //--------------- states --------------------
  const [isScanning, setScanning] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [isBluetoothModal, setBluetoothModal] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(AppState.current);
  const [currentDevice, setCurrentDevice] = useState();
  const [deviceInfo, setDeviceInfo] = useState({});
  const [historyAskModal, setHistoryAskModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [historyDataArray, setHistoryDataArray] = useState([]); //for share
  const [historyListArray, setHistoryListArray] = useState([]);
  const [gettingInfoModal, setGettingInfoModal] = useState(false);

  useEffect(() => {
    console.log("106:", activeUser);
    activeUserHandler();
    if (Platform.OS === "android") {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      ]).then((statuses) => {
        console.log("ok");
      });
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      }).then((data) => console.log("ok:", data));
    }

    if (!device) setShowDevicesModal(true);
    if (device == "Oksimetre") {
      const subscription = AppState.addEventListener("change", async () => {
        setAppStateVisible(!appStateVisible);
        if (AppState.currentState === "background") {
          await backgroundServer.start(handleOxiInBackground, options);
        } else {
          await backgroundServer.stop().then(() => {
            console.log("working background stop");
          });
        }
      });
      return () => {
        subscription.remove();
      };
    }
  }, [device, userUpdated]);

  //----------------------background task -----------------------
  const handleOxiInBackground = async () => {
    await new Promise(async (resolve) => {
      for (let i = 0; backgroundServer.isRunning(); i++) {
        setTimeout(() => {
          const byteArray = new Uint8Array([
            0xaa, 0x17, 0xe8, 0x00, 0x00, 0x00, 0x00, 0x1b,
          ]);

          BLTManager.writeCharacteristicWithResponseForDevice(
            currentDevice?.id,
            "14839AC4-7D7E-415C-9A42-167340CF2339",
            "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
            base64.encodeFromByteArray(byteArray)
          )
            .then(() => {
              console.log("data sended successfully in background");
            })
            .catch((e) => console.log(e));
        }, 1000).hasRef(() => {
          currentDevice?.monitorCharacteristicForService(
            serviceUUIDhandler(currentDevice.name),
            receiveUUIDhandler(currentDevice.name),
            (error, characteristic) => {
              if (error) {
                console.log(`Error monitoring characteristic:178 ${error}`);
                return;
              } else {
                let hex = base64ToHex(characteristic.value);
                setHeartBeat([
                  ...heartBeat,
                  parseInt(hex.substring(16, 18), 16),
                ]);
                setOxiPer([...oxiPer, parseInt(hex.substring(14, 16), 16)]);
              }
            }
          );
        });
      }
    });
  };
  //-----------------start connecting -------------------
  const connectingToDevice = async () => {
    await BLTManager.state()
      .then(async (val) => {
        if (val !== "PoweredOn") {
          await BLTManager.enable().then(() =>
            console.log("bluetooth is turned on")
          );
        }
      })
      .then(() => {
        if (!isConnected) {
          setScanning(true);
          if (!gettingInfoModal) {
            setBluetoothModal(true);
          }
          scanDevices();
        }
      });
  };
  //----------------------scanning --------------------------

  const scanDevices = async () => {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn("error line 206", error);
      }
      if (scannedDevice) {
        console.log("219", scanDevices.name);
        if (scannedDevice.name == "VTM AD5" && device == "Fetal Doppler") {
          BLTManager.stopDeviceScan();

          if (macAddressChecker(scannedDevice.id)) {
            connectDevice(scannedDevice);
            setScanning(false);
            setBluetoothModal(false);
          } else {
            Alert.alert("Cihazınız firmamıza ait değildir.");
          }
        }
        if (scannedDevice.name?.startsWith("O2Ring") && device == "Oksimetre") {
          BLTManager.stopDeviceScan();
          if (macAddressChecker(scannedDevice.id)) {
            connectDevice(scannedDevice);
            setScanning(false);
            setBluetoothModal(false);
          } else {
            Alert.alert("Cihazınız firmamıza ait değildir.");
          }
        }
        if (scannedDevice.name?.startsWith("DuoEK") && device == "EKG") {
          BLTManager.stopDeviceScan();
          // if (macAddressChecker(scannedDevice.id)) {
          connectDevice(scannedDevice);
          setScanning(false);
          setBluetoothModal(false);
          // } else {
          //   Alert.alert("Cihazınız firmamıza ait değildir.");
          // }
        }
      }
    });
    // stop scanning devices after 5 seconds
    setTimeout(() => {
      BLTManager.stopDeviceScan();
      setScanning(false);
    }, 5000);
  };

  //---------------------connecting to device -------------------
  async function connectDevice(device) {
    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        // handle disconnect device
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          setConnected(false);
          if (OxiInterval) clearInterval(OxiInterval);
          BLTManager.cancelTransaction("transactionID");
          BLTManager.cancelTransaction("transactionID2");
        });
        //sending pass frequently

        if (device.name == "VTM AD5") {
          sendPasswordForDob(device).then(() => {
            console.warn("message sended");
          });
        }

        if (device.name.startsWith("O2Ring")) {
          setCurrentDevice(device);
          if (deviceInfo.bat) {
            sendAndGetNormalDataToOxi(device);
          } else {
            sendPassToGetInfo(device);
          }
          return;
        }

        if (device.name.startsWith("DuoEK")) {
          sendPasswordForEKG(device).then(() => {
            console.warn("message sended");
          });
        }

        device.monitorCharacteristicForService(
          serviceUUIDhandler(device.name),
          receiveUUIDhandler(device.name),
          (error, characteristic) => {
            if (error) {
              console.log(`Error monitoring characteristic: 307 ${error}`);
              return;
            } else {
              let value = base64ToHex(characteristic.value);
              console.log("value in 316:", value);
              if (device.name === "VTM AD5") {
                let message = base64
                  .decode(characteristic.value)
                  .replace(/\s\s+/g, " ")
                  .charCodeAt(11);
                setMessage(message);
              }

              if (device.name.startsWith("DuoEK")) {
                let value = base64ToHex(characteristic.value);
                if (value.startsWith("a5")) {
                  characteristicRef.current = value;
                } else {
                  characteristicRef.current += value;
                }
                if (value.length < 25) {
                  setMessage(
                    characteristicRef.current.substring(
                      58,
                      characteristicRef.current.length - 2
                    )
                  );
                }
                if (value.startsWith("a503fc010a1600")) {
                  setMessage("0");
                }
              }
            }
          },
          "transactionID"
        );
      });
  }

  //------------------disconnect function --------------------------
  async function disconnectBluetooth() {
    if (OxiInterval) {
      clearInterval(OxiInterval);
    }
    setHistoryListArray([]);
    characteristicRef.current = "";
    await backgroundServer.stop();

    setDeviceInfo({});
    setConnectedDevice(undefined);
    await BLTManager.disable().then(() => console.log("bluetooth off"));
    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        await BLTManager.cancelDeviceConnection(connectedDevice.id).then(
          async () => {
            await BLTManager.cancelTransaction("InfoReadTransaction");
            await BLTManager.cancelTransaction("normalDataTransaction");
            await BLTManager.cancelTransaction("historyReadTransaction");

            BLTManager.console.log("DC completed");
          }
        );
      }
      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setConnected(false);
        connectedDevice.cancelConnection();
      }
    }
  }
  //-------------------------------------------------------------------
  // ---------------------send data to EKG ----------------------------
  //--------------------********************----------------------------
  const sendPasswordForEKG = async (device) => {
    const byteArray = new Uint8Array([
      0xa5, 0x03, 0xfc, 0x00, 0x0a, 0x01, 0x00, 0x7d, 0xbf,
    ]);
    OxiInterval = setInterval(() => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        device.id,
        "14839ac4-7d7e-415c-9a42-167340cf2339",
        "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3",
        base64.encodeFromByteArray(byteArray)
      )
        .then(() => {
          // console.log("data sended successfully");
          // setCounter((per) => per + 1);
        })
        .catch((e) => console.log(e));
    }, 1280);
  };
  //-------------------------------------------------------------------
  //*************** oxi bluetooth connection handlers************** */
  //-------------------------------------------------------------------

  const sendPassToGetInfo = async (device) => {
    const getInfoByteArray = new Uint8Array([
      0xaa, 0x14, 0xeb, 0x00, 0x00, 0x00, 0x00, 0xc6,
    ]);
    let result;
    try {
      setTimeout(async () => {
        await BLTManager.writeCharacteristicWithResponseForDevice(
          device.id,
          "14839AC4-7D7E-415C-9A42-167340CF2339",
          "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
          base64.encodeFromByteArray(getInfoByteArray)
        ).then(() => {
          console.log("data sended successfully to get info 389");
        });

        await device.monitorCharacteristicForService(
          "14839ac4-7d7e-415c-9a42-167340cf2339",
          "0734594a-a8e7-4b1a-a6b1-cd5243059a57",
          (error, characteristic) => {
            if (error) {
              console.log(
                `Error monitoring characteristic in getting info 395 ${error}`
              );
              return;
            } else {
              let value = base64ToHex(characteristic.value);
              console.log("+value in get info: ", value);

              //--- get battery value
              if (value.includes("22437572424154223a")) {
                console.log("data comes ....");
                //the text is "CurBAT":
                const text = hexToText(value);
                const regex = /"CurBAT":"(.*?)%"/;
                const match = text.match(regex);
                if (match && match[1]) {
                  const percentageValue = match[1];
                  setDeviceInfo({ bat: percentageValue });
                }
              }

              if (value.includes("46696c654c69737422")) {
                const cut = value.substring("46696c654c69737422");
                characteristicRef.current = cut;
                console.log("in if 394");
              } else if (
                characteristicRef.current.includes("46696c654c69737422")
              ) {
                characteristicRef.current += value;
                result = hexToText(characteristicRef.current);
              }
            }
          },
          "InfoReadTransaction"
        );
      }, 500);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      if (historyListArray.length === 0) {
        console.log("history array in 453:", historyListArray);
        HistoryChecker(result, device);
        console.log("data in 440:", characteristicRef.current);
      }
    }, 2000);
    console.log("in 440 after monitoring...");
  };
  //-------------------------------------------------------------------
  const HistoryChecker = async (resultString, device) => {
    console.log("result in history checker 450:", resultString);
    if (!resultString) {
      setGettingInfoModal(true);
      //try to get info again:
      let i = 0;
      const sendInfo = async () => {
        console.log("ref in 467:", characteristicRef.current);
        if (i < 4) {
          const getInfoByteArray = new Uint8Array([
            0xaa, 0x14, 0xeb, 0x00, 0x00, 0x00, 0x00, 0xc6,
          ]);

          if (!deviceInfo.bat) {
            BLTManager.writeCharacteristicWithResponseForDevice(
              device.id,
              "14839AC4-7D7E-415C-9A42-167340CF2339",
              "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
              base64.encodeFromByteArray(getInfoByteArray)
            ).then(() => {
              console.log("data sent successfully to get info 475");
            });
            i++;
            setTimeout(sendInfo, 1500);
          } else {
            return;
          }
        }
      };
      await sendInfo();
      console.log("before reconnect:", deviceInfo);
      if (!deviceInfo.bat) {
        await disconnectBluetooth();
        await connectingToDevice();
      }
      console.log("after reconnect:", deviceInfo);
    } else {
      setGettingInfoModal(false);
      const result = [];
      const index = resultString.indexOf("FileList") + 11;
      const lastIndex = resultString.indexOf("}") - 2;
      const historyTimeArray = resultString.slice(index, lastIndex).split(",");
      console.log("in 494:", historyTimeArray);
      const userData = activeUser.oxiDataArray;
      if (userData === undefined && historyTimeArray.length > 0) {
        const lastResult = [];
        historyTimeArray.map((item) => {
          let obj = { date: item, saved: false };
          lastResult.push(obj);
        });
        setHistoryListArray(lastResult);
        setHistoryAskModal(true);
        console.log("in 485", lastResult);
        characteristicRef.current = "";
      } else {
        await historyTimeArray.map((id) => {
          console.log("user data in 520:", userData);
          const input = userData.findIndex((obj) => obj.id === id);
          console.log("input 522:", input);
          if (input === -1) {
            let obj = { date: id, saved: false };
            result.push(obj);
          }
        });
        if (result.length > 0) {
          console.log("last result in 536:", result);
          setHistoryListArray(result);
          setHistoryAskModal(true);
          characteristicRef.current = "";
        } else {
          characteristicRef.current = "";
          sendAndGetNormalDataToOxi(device);
        }
      }
    }
  };
  //-------------------------------------------------------------------
  const sendAndGetNormalDataToOxi = async (device) => {
    await BLTManager.cancelTransaction("InfoReadTransaction");
    await BLTManager.cancelTransaction("historyReadTransaction");
    setHistoryAskModal(false);
    setTimeout(() => {
      const byteArray = new Uint8Array([
        0xaa, 0x17, 0xe8, 0x00, 0x00, 0x00, 0x00, 0x1b,
      ]);
      OxiInterval = setInterval(() => {
        BLTManager.writeCharacteristicWithResponseForDevice(
          device.id,
          "14839AC4-7D7E-415C-9A42-167340CF2339",
          "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
          base64.encodeFromByteArray(byteArray)
        )
          .then(() => {
            console.log("sending data in interval...");
          })
          .catch((e) => console.log("not send :", e));
      }, 1000);
      device.monitorCharacteristicForService(
        "14839ac4-7d7e-415c-9a42-167340cf2339",
        "0734594a-a8e7-4b1a-a6b1-cd5243059a57",
        (error, characteristic) => {
          if (error) {
            console.log(`++Error in monitoring normal data ${error}`);
            return;
          } else {
            let value = base64ToHex(characteristic.value);
            console.log("value in reading normal data: ", value);
            if (device === undefined) {
              disconnectBluetooth();
            } else {
              let item = parseInt(value.substring(16, 18), 16);
              if (!isNaN(item)) {
                let message = [item, parseInt(value.substring(14, 16), 16)];
                setMessage(message);
              }
            }
          }
        },
        "normalDataTransaction"
      );
    }, 500);
  };
  //-------------------------------------------------------------------
  const takeAndSaveOfLineData = async (itemTime) => {
    console.log("=====item in 582:", itemTime);
    await BLTManager.cancelTransaction("InfoReadTransaction");
    await BLTManager.cancelTransaction("historyReadTransaction");
    setIsDataLoading(true);
    characteristicRef.current = "";
    const byteArray = await firstDataArrayMaker(itemTime);
    const byteArray2 = await secondDataArrayMaker(itemTime);
    const byteArray3 = new Uint8Array([
      0xaa, 0x04, 0xfb, 0x00, 0x00, 0x00, 0x00, 0x6a,
    ]);
    const tryAgain = async () => {
      console.log("in trying ...");
      await BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray)
      );
      await BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray2)
      );
      await BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray3)
      );
      setTimeout(() => {
        if (!characteristicRef.current.includes("5500ff00")) {
          console.log("in if 613");
          tryAgain();
        } else {
          console.log("in else 616");
          saveOfLineData(itemTime);
        }
      }, 2000);
    };
    setTimeout(() => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray)
      )
        .then(() => {
          console.log("data 1 sent successfully", byteArray);
          connectedDevice.monitorCharacteristicForService(
            "14839ac4-7d7e-415c-9a42-167340cf2339",
            "0734594a-a8e7-4b1a-a6b1-cd5243059a57",
            (error, characteristic) => {
              if (error) {
                console.log(`Error in monitoring history data ${error}`);
                return;
              } else {
                let value = base64ToHex(characteristic.value);
                console.log("+++value in history data: ", value);
                // if (!value.includes("5501fe")) {
                characteristicRef.current += value;
                // }
              }
            },
            "historyReadTransaction"
          );
        })
        .catch((e) => console.log(e));
    }, 200);

    setTimeout(() => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray2)
      )
        .then(() => {
          console.log("data 2 sended successfully", byteArray2);
        })
        .catch((e) => console.log(e));
    }, 250);

    setTimeout(() => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray3)
      )
        .then(() => {
          console.log("data 3 sended successfully");
        })
        .catch((e) => console.log(e));
    }, 400);
    setTimeout(() => {
      if (!characteristicRef.current.includes("5500ff00")) {
        console.log("684 is going to try again ...");
        tryAgain();
      } else {
        console.log("687 in else ....");
        saveOfLineData(itemTime);
      }
    }, 2000);
  };
  //-------------------------------------------------------------------
  const saveOfLineData = (itemTime) => {
    console.log(
      "char ref in 589 save of line data: ",
      characteristicRef.current
    );
    if (characteristicRef.current.includes("ffff")) {
      console.log("in if that include ffff ......");
      saveHistoryItem(itemTime);
    } else {
      console.log("in else no include ffff");
      if (!characteristicRef.current.includes("5500ff")) {
        setHistoryAskModal(false);
        sendAndGetNormalDataToOxi(connectedDevice);
        setIsDataLoading(false);
      } else {
        takeRestOfData(itemTime);
      }
    }
  };
  //-------------------------------------------------------------------
  const saveHistoryItem = async (itemTime) => {
    console.log("reading is finished and comes to save item 712");
    let itemObject;
    itemObject = { id: itemTime, data: characteristicRef.current };
    saveHistoryItemToStorage(itemObject);
    const closeByteArray = new Uint8Array([
      0xaa, 0x05, 0xfa, 0x00, 0x00, 0x00, 0x00, 0x21,
    ]);
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice.id,
      "14839AC4-7D7E-415C-9A42-167340CF2339",
      "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
      base64.encodeFromByteArray(closeByteArray)
    ).then(async () => {
      await BLTManager.cancelTransaction("historyReadTransaction");
      console.log("data to close item sent");
    });
    setTimeout(() => {
      setHistoryDataArray([itemObject, ...historyDataArray]); // for share
      const stateCopy = [...historyListArray];
      const itemIndex = stateCopy.findIndex((obj) => obj.date === itemTime);
      stateCopy[itemIndex].saved = true;
      setHistoryListArray(stateCopy);
      setIsDataLoading(false);
    }, 1000);
  };
  console.log(activeUser.name);
  //-------------------------------------------------------------------
  const takeRestOfData = async (itemTime) => {
    console.log("before while");
    let i = 1;
    while (!characteristicRef.current.includes("ffff")) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const byteArray = createByteArray(i);
      console.log("in 641 taking rest data", byteArray);
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        "14839AC4-7D7E-415C-9A42-167340CF2339",
        "8B00ACE7-EB0B-49B0-BBE9-9AEE0A26E1A3",
        base64.encodeFromByteArray(byteArray)
      ).then(() => {
        console.log("get data continues ");
        i++;
      });
    }
    console.log("after while ");
    saveHistoryItem(itemTime);
    console.log("get data finished");
  };
  console.log("763:", historyListArray);
  //-------------------------------------------------------------------
  //-----------------send data to dopp --------------------------------
  //-------------------------------------------------------------------
  const sendPasswordForDob = async (device) => {
    const byteArray = new Uint8Array([
      0xff, 0xfd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xfc,
    ]);

    BLTManager.writeCharacteristicWithResponseForDevice(
      device.id,
      "0000FFE5-0000-1000-8000-00805F9B34FB",
      "0000FFE9-0000-1000-8000-00805F9B34FB",
      base64.encodeFromByteArray(byteArray)
    )
      .then(() => {
        console.log("data sended successfully");
      })
      .catch((e) => console.log("the error is:", e));
  };

  return (
    //-----------------------jsx body -------------------------
    <ScreenLayout
      header={
        <Header
          isConnected={isConnected}
          setShowDevicesModal={setShowDevicesModal}
          isPanel={true}
          connectingToDevice={connectingToDevice}
        />
      }
    >
      <MainScreensContainer>
        {!isConnected && device === "Fetal Doppler" && <DoppDisconnect />}
        {isConnected && device === "Fetal Doppler" && (
          <DoppConnect
            // message={message}
            disconnectBluetooth={disconnectBluetooth}
          />
        )}
        {!isConnected && device === "Oksimetre" && <OximDisconnect />}
        {isConnected && device === "Oksimetre" && (
          <OximConnect
            deviceInfo={deviceInfo}
            disconnectBluetooth={disconnectBluetooth}
            // repeatSendingData={repeatSendingData}
          />
        )}
        {!isConnected && device === "EKG" && <EKGDisconnect />}
        {isConnected && device === "EKG" && (
          <EKGConnect
            // message={message}
            disconnectBluetooth={disconnectBluetooth}
          />
        )}
        {!isConnected && device === "Vücut Analizi" && <VADisconnect />}
        {isConnected && device === "Vücut Analizi" && <VAConnect />}
      </MainScreensContainer>
      <ChooseDeviceModal
        isModalVisible={showDevicesModal}
        setDevice={setDevice}
        saveDeviceToStorage={saveDeviceToStorage}
        setShowDevicesModal={setShowDevicesModal}
      />
      {/* bluetooth connecting modal */}
      <ModalContainer
        isModalVisible={isBluetoothModal}
        animation="fade"
        heightPercentage={60}
      >
        {isScanning ? (
          <Lottie
            source={require("../assets/lottie/bluetooth-scanning.json")}
            style={{ flex: 1 }}
            autoPlay
            loop={true}
          />
        ) : (
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: -25 }}
              onPress={() => setBluetoothModal(false)}
            >
              <Text style={{ fontSize: 24, color: colors.text }}>X</Text>
            </TouchableOpacity>
            <TitleText children="Cihazı Bulamadım" size={28} />
            <View style={{ flex: 1 }}>
              <Lottie
                source={require("../assets/lottie/notFound.json")}
                autoPlay
                loop={true}
              />
            </View>
            <SubmitBtn
              widthPercentage={50}
              title="Tekrar Dene"
              onPressFun={() => connectingToDevice()}
            />
          </View>
        )}
      </ModalContainer>
      {/* get history data modal */}
      <ModalContainer
        isModalVisible={historyAskModal}
        animation="fade"
        heightPercentage={60}
      >
        <View>
          <TitleText
            children={`Cihazınıza kaydedilen ${historyListArray?.length} yeni öğe var.`}
            size={24}
          />
          {!isDataLoading ? (
            <>
              <FlatList
                style={{ marginTop: "10%" }}
                data={historyListArray}
                keyExtractor={(item, index) => index.toString()} // Make sure to convert the index to a string
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        height: 40,
                        alignItems: "center",
                        margin: 5,
                      }}
                    >
                      {item.date.length > 10 && (
                        <>
                          <TitleText size={18}>
                            {formatDateTime(item.date)}
                          </TitleText>
                          {!item.saved ? (
                            <TouchableOpacity
                              style={{
                                backgroundColor: colors.midBlue,
                                paddingVertical: 3,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                flexDirection: "row",
                              }}
                              onPress={() => {
                                takeAndSaveOfLineData(item.date);
                              }}
                            >
                              <Feather
                                name="download"
                                size={18}
                                color={colors.white}
                              />
                              <Text
                                style={{
                                  color: colors.white,
                                  fontSize: 18,
                                  marginLeft: 5,
                                }}
                              >
                                Indir
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <ShareBtn
                              item={item.date}
                              dataArray={historyDataArray}
                              name={activeUser.name}
                            />
                          )}
                        </>
                      )}
                    </View>
                  );
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: "20%",
                }}
              >
                <SubmitBtn
                  widthPercentage={30}
                  title="Tamam"
                  onPressFun={() => {
                    sendAndGetNormalDataToOxi(connectedDevice);
                    setHistoryAskModal(false);
                    setHistoryListArray([]);
                  }}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                width: "100%",
                height: 200,
              }}
            >
              <Lottie
                source={require("../assets/lottie/Pre-comp.json")}
                autoPlay
                loop
              />
            </View>
          )}
        </View>
      </ModalContainer>
      {/* is getting info modal */}
      <ModalContainer
        heightPercentage={80}
        isModalVisible={gettingInfoModal}
        animation="fade"
      >
        <Lottie
          source={require("../assets/lottie/Loading-modal.json")}
          style={{ flex: 1 }}
          autoPlay
          loop={true}
        />
      </ModalContainer>
    </ScreenLayout>
  );
};

export default Panel;
