import { useContext, useEffect, useState } from "react";
import { View, LogBox, Alert, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../context/mainContext";
import Lottie from "lottie-react-native";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { requestMultiple, PERMISSIONS } from "react-native-permissions";
const BLTManager = new BleManager();
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();
let OxiInterval;
// customize components import
import {
  base64ToHex,
  // base64ToDecimal,
  receiveUUIDhandler,
  serviceUUIDhandler,
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
// import { getPermission } from "../assets/utility/getAndroidPermission";
import ModalContainer from "../components/ModalContainer";
import { SubmitBtn } from "../components/SubmitBtn";
import { TitleText } from "../components/TitleText";
import { colors } from "../assets/utility/colors";
import { macAddressChecker } from "../assets/utility/macAddress";
import { MainScreensContainer } from "../styles";

const Panel = (props) => {
  const { device, setDevice, saveDeviceToStorage } = useContext(AppContext);
  //--------------- states --------------------
  const [isScanning, setScanning] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [isBluetoothModal, setBluetoothModal] = useState(false);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]).then((statuses) => {
      console.log("ok");
    });
    BLTManager.state().then((val) => {
      if (val !== "PoweredOn") {
        BLTManager.enable().then(() => console.log("bluetooth is turned on"));
      }
    });
    if (!device) setShowDevicesModal(true);
  }, []);
  //-----------------start connecting -------------------
  const connectingToDevice = () => {
    if (!isConnected) {
      setScanning(true);
      setBluetoothModal(true);
      scanDevices();
    }
  };
  //----------------------scanning --------------------------

  const scanDevices = async () => {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }
      if (scannedDevice) {
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
        if (scannedDevice.name == "O2Ring 0217" && device == "Oksimetre") {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
          setScanning(false);
          setBluetoothModal(false);
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
        });
        //sending pass frequently

        if (device.name == "VTM AD5") {
          sendPasswordForDob(device).then(() => {
            console.warn("message sended");
          });
        }
        console.log(device.name);
        if (device.name == "O2Ring 0217") {
          sendPasswordForOxi(device).then(() => {
            console.warn("message sended");
          });
        }

        device.monitorCharacteristicForService(
          serviceUUIDhandler(device.name),
          receiveUUIDhandler(device.name),
          (error, characteristic) => {
            if (error) {
              console.log(`Error monitoring characteristic: ${error}`);
              return;
            } else {
              if (device.name === "VTM AD5") {
                let message = base64
                  .decode(characteristic.value)
                  .replace(/\s\s+/g, " ")
                  .charCodeAt(11);
                setMessage(message);
                console.log(
                  base64
                    .decode(characteristic.value)
                    .replace(/\s\s+/g, " ")
                    .charCodeAt(11)
                );
              }

              if (device.name == "O2Ring 0217") {
                let hex = base64ToHex(characteristic.value);
                // console.log(hex.slice(16, 18));
                let message = [
                  parseInt(hex.substring(16, 18), 16),
                  parseInt(hex.substring(14, 16), 16),
                ];
                setMessage(message);
              }
            }
          }
        );
      });
  }

  //------------------disconnect function --------------------------
  async function disconnectBluetooth() {
    if (OxiInterval) clearInterval(OxiInterval);
    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction("messagetransaction");
        BLTManager.cancelTransaction("nightmodetransaction");
        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log("DC completed")
        );
      }
      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setConnected(false);
        connectedDevice.cancelConnection();
      }
    }
  }

  //-----------------send value to device function -----------------------
  const sendPasswordForDob = async (device) => {
    const byteArray = new Uint8Array([
      0xff, 0xfd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xfc,
    ]);
    console.log("sending ....");
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
  const sendPasswordForOxi = async (device) => {
    const byteArray = new Uint8Array([
      0xaa, 0x17, 0xe8, 0x00, 0x00, 0x00, 0x00, 0x1b,
    ]);

    OxiInterval = setInterval(() => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        device.id,
        "14839ac4-7d7e-415c-9a42-167340cf2339",
        "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3",
        base64.encodeFromByteArray(byteArray)
      )
        .then(() => {
          console.log("data sended successfully");
        })
        .catch((e) => console.log(e));
    }, 1000);
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
            message={message}
            disconnectBluetooth={disconnectBluetooth}
          />
        )}
        {!isConnected && device === "Oksimetre" && <OximDisconnect />}
        {isConnected && device === "Oksimetre" && (
          <OximConnect
            message={message}
            disconnectBluetooth={disconnectBluetooth}
          />
        )}
        {!isConnected && device === "EKG" && <EKGDisconnect />}
        {isConnected && device === "EKG" && <EKGConnect />}
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
    </ScreenLayout>
  );
};

export default Panel;
