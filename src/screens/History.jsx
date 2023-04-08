import { useState, useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { AppContext } from "../context/mainContext";
import { Header } from "../components/Header";
import { HistoryScreensContainer } from "../styles";
import ChooseDeviceModal from "../components/ChooseDeviceModal";
import HistoryEKG from "../historyComponents/HistoryEKG";
import HistoryVA from "../historyComponents/HistoryVA";
import HistoryFetal from "../historyComponents/HistoryFetal";
import HistoryOxim from "../historyComponents/HistoryOxim";

const History = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const { setDevice, device } = useContext(AppContext);
  return (
    <ScreenLayout
      header={
        <Header setShowDevicesModal={setShowDevicesModal} isPanel={false} />
      }
    >
      <HistoryScreensContainer>
        {device === "Fetal Doppler" && <HistoryFetal navigation={navigation} />}
        {device === "Oksimetre" && <HistoryOxim />}
        {device === "EKG" && <HistoryEKG />}
        {device === "Vücut Analizi" && <HistoryVA />}
      </HistoryScreensContainer>
      <ChooseDeviceModal
        isModalVisible={showDevicesModal}
        setDevice={setDevice}
        setShowDevicesModal={setShowDevicesModal}
        setFirstTime={false}
      />
    </ScreenLayout>
  );
};
export default History;
