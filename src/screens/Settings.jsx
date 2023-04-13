import { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { AppContext } from "../context/mainContext";
import { Header } from "../components/Header";
import ChooseDeviceModal from "../components/ChooseDeviceModal";
import { SettingContentContainer, SettingItemContainer } from "../styles";
import { DescriptionText } from "../components/DescriptionText";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";

const Settings = ({ navigation }) => {
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const { setDevice, saveDeviceToStorage } = useContext(AppContext);
  return (
    <ScreenLayout
      header={
        <Header setShowDevicesModal={setShowDevicesModal} isPanel={false} />
      }
    >
      <SettingContentContainer>
        <SettingItemContainer onPress={() => navigation.navigate("UsersList")}>
          <FontAwesome
            name="users"
            size={24}
            color={colors.text}
            style={{ marginRight: 20 }}
          />
          <DescriptionText size={20}>Kullanıcı Yönetimi</DescriptionText>
        </SettingItemContainer>
        <SettingItemContainer
          onPress={() => navigation.navigate("ReminderList")}
        >
          <FontAwesome
            name="bell"
            size={24}
            color={colors.text}
            style={{ marginRight: 20 }}
          />
          <DescriptionText size={20}>Hatırlatma</DescriptionText>
        </SettingItemContainer>
        <SettingItemContainer onPress={() => setShowDevicesModal(true)}>
          <Entypo
            name="cycle"
            size={24}
            color={colors.text}
            style={{ marginRight: 20 }}
          />
          <DescriptionText size={20}>Cihazı Değiştir</DescriptionText>
        </SettingItemContainer>
      </SettingContentContainer>
      <ChooseDeviceModal
        isModalVisible={showDevicesModal}
        setDevice={setDevice}
        setShowDevicesModal={setShowDevicesModal}
        setFirstTime={false}
        saveDeviceToStorage={saveDeviceToStorage}
      />
    </ScreenLayout>
  );
};
export default Settings;
