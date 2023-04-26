import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { colors } from "../assets/utility/colors";
import { TitleText } from "./TitleText";
import ModalContainer from "./ModalContainer";

const ChooseDeviceModal = ({
  isModalVisible,
  setDevice,
  setShowDevicesModal,
  saveDeviceToStorage,
}) => {
  const chooseHandle = (name) => {
    setDevice(name);
    setShowDevicesModal(false);
    saveDeviceToStorage(name);
  };
  return (
    <ModalContainer heightPercentage={70} isModalVisible={isModalVisible}>
      <TitleText children="Kullanacağınız Cihazları Seçiniz" size={20} />
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/oximetre.jpeg")}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              marginRight: 30,
              borderColor: colors.text,
              borderWidth: 2,
            }}
          />
          <TouchableOpacity onPress={() => chooseHandle("Oksimetre")}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: "500",
              }}
            >
              Yüzük Oksimetre
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/FetalDoppler.jpeg")}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              marginRight: 30,
              borderColor: colors.text,
              borderWidth: 2,
            }}
          />
          <TouchableOpacity onPress={() => chooseHandle("Fetal Doppler")}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: "500",
              }}
            >
              Fetal Doppler
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/EKG.jpeg")}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              marginRight: 30,
              borderColor: colors.text,
              borderWidth: 2,
            }}
          />
          <TouchableOpacity onPress={() => chooseHandle("EKG")}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: "500",
              }}
            >
              Mobil EKG
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/VA.jpeg")}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              marginRight: 30,
              borderColor: colors.text,
              borderWidth: 2,
            }}
          />
          <TouchableOpacity onPress={() => chooseHandle("Vücut Analizi")}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: "500",
              }}
            >
              Vücut Analizi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContainer>
  );
};
export default ChooseDeviceModal;
