import { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/mainContext";
import { DescriptionText } from "./DescriptionText";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";

export const Header = ({
  isConnected,
  setShowDevicesModal,
  isPanel,
  connectingToDevice,
}) => {
  const [activeUser, setActiveUser] = useState({});
  const { device, user, userUpdated } = useContext(AppContext);

  useEffect(() => {
    user.map((item, index) => {
      if (item.status === "active") {
        setActiveUser(user[index]);
      }
    });
  }, [userUpdated]);

  const imageAddressHandler = () => {
    if (device === "Fetal Doppler")
      return require("../assets/images/FetalDoppler.jpeg");
    if (device === "Oksimetre")
      return require("../assets/images/oximetre.jpeg");
    if (device === "EKG") return require("../assets/images/EKG.jpeg");
    if (device === "Vücut Analizi") return require("../assets/images/VA.jpeg");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        marginHorizontal: 20,
        zIndex: 10000,
      }}
    >
      <View
        style={{
          alignItems: "center",
          minWidth: 50,
        }}
      >
        <FontAwesome name="user" color={colors.text} size={20} />
        <DescriptionText children={activeUser?.name} size={17} />
      </View>
      <TouchableOpacity
        onLongPress={() => setShowDevicesModal(true)}
        style={{
          paddingLeft: 30,
        }}
      >
        <Image
          source={imageAddressHandler()}
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
      </TouchableOpacity>
      {isPanel && (
        <TouchableOpacity
          style={{ alignItems: "center", minWidth: 50 }}
          onPress={() => connectingToDevice()}
        >
          <MaterialIcons
            name={isConnected ? "bluetooth-connected" : "bluetooth-disabled"}
            size={22}
            color={colors.text}
          />
          <DescriptionText
            children={isConnected ? "Bağlı" : "Bağlan"}
            size={17}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
