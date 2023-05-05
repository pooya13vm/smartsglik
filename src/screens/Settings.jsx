import { useState, useContext, useCallback } from "react";
import { Linking } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { AppContext } from "../context/mainContext";
import { Header } from "../components/Header";
import ChooseDeviceModal from "../components/ChooseDeviceModal";
import { SettingContentContainer, SettingItemContainer } from "../styles";
import { DescriptionText } from "../components/DescriptionText";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";

const Settings = ({ navigation }) => {
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const { setDevice, saveDeviceToStorage } = useContext(AppContext);
  const handleURLPress = useCallback(async () => {
    const url = "https://www.sush.com.tr/smart-saglik-sikca-sorulan-sorular";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
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
        <SettingItemContainer onPress={handleURLPress}>
          <MaterialCommunityIcons
            name="frequently-asked-questions"
            size={24}
            color={colors.text}
            style={{ marginRight: 20 }}
          />
          <DescriptionText size={20}>S.S.S</DescriptionText>
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
