import { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { BlockContainer, PanelContentContainer, BlockTitle } from "../styles";
import styled from "styled-components";
import { colors } from "../assets/utility/colors";
import { TitleText } from "../components/TitleText";
import { ProgressCircle } from "react-native-svg-charts";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppContext } from "../context/mainContext";
import uuid from "react-native-uuid";
import { SaveQuestionModal } from "../components/SaveQuestionModal";
import Lottie from "lottie-react-native";
import {
  oxiReportMaker,
  averageGroups,
  findMinMax,
  heartReportMaker,
} from "../assets/utility/reportFunctions";

const TopTextContainer = styled.View`
  position: absolute;
  left: 0;
  top: 100px;
  align-items: center;
`;
const TopTextRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const TopTextNumber = styled.Text`
  font-size: 52px;
  color: ${colors.text};
  font-weight: 700;
`;
const TopText = styled.Text`
  font-size: 22px;
  color: ${colors.text};
  font-weight: 400;
  margin-bottom: 10px;
`;

const OximConnect = ({ deviceInfo, disconnectBluetooth }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [heartBeatItem, setHeartBeatItem] = useState(0);
  const [oxiPerItem, setOxiPerItem] = useState(0);
  const [waitingModal, setWaitingModal] = useState(true);
  const [batteryPer, setBatteryPer] = useState("");

  const {
    heartBeat,
    setHeartBeat,
    oxiPer,
    setOxiPer,
    startTime,
    setStartTime,
    saveNewOxiItem,
    message,
    isConnected,
    // historyListArray,
  } = useContext(AppContext);

  // setTimeout(() => {
  //   setWaitingModal(false);
  // }, 1000);

  useEffect(() => {
    if (deviceInfo.bat) {
      setBatteryPer(deviceInfo.bat);
    }
    console.log("message in connect useeffect:", message);
    // if (!startTime) setStartTime(new Date());
    if (message[0] > 0 && message[0] < 220) {
      if (!startTime) setStartTime(new Date());
      setWaitingModal(false);
      setHeartBeatItem(message[0]);
      setOxiPerItem(message[1]);
      setHeartBeat([...heartBeat, message[0]]);
      setOxiPer([...oxiPer, message[1]]);
    }
  }, [message]);

  const timeDistanceHandler = () => {
    if (heartBeat.length <= 20) return "1 Saniye";
    if (heartBeat.length <= 40) return "2 Saniye";
    if (heartBeat.length <= 60) return "3 Saniye";
    if (heartBeat.length <= 100) return "5 Saniye";
    if (heartBeat.length <= 200) return "10 Saniye";
    if (heartBeat.length <= 400) return "20 Saniye";
    if (heartBeat.length <= 600) return "30 Saniye";
    if (heartBeat.length > 600) return "1 Dakika";
  };

  //------------------- handlers -----------------
  const noSaveHandler = () => {
    setShowSaveModal(false);
    setHeartBeat([]);
    setOxiPer([]);
    setHeartBeatItem(0);
    setOxiPerItem(0);
    disconnectBluetooth();
    setStartTime(null);
  };
  const saveHandler = () => {
    const itemObj = {
      startTime: startTime.toString(),
      stopTime: new Date().toString(),
      heartArray: averageGroups(heartBeat),
      oxiArray: averageGroups(oxiPer),
      heartMM: findMinMax(heartBeat),
      oxiMM: findMinMax(oxiPer),
      heartReport: heartReportMaker(heartBeat),
      oxiReport: oxiReportMaker(oxiPer),
      id: uuid.v4(),
      timeDistance: timeDistanceHandler(),
    };
    saveNewOxiItem(itemObj);
    noSaveHandler();
  };

  return (
    <PanelContentContainer>
      <View
        style={{
          position: "absolute",
          top: -30,
          flexDirection: "row",
          left: "45%",
        }}
      >
        <FontAwesome5 name="battery-empty" size={22} color={colors.text} />
        <TitleText size={18}>{batteryPer}</TitleText>
      </View>

      <BlockContainer>
        <View
          style={{
            flex: 1,
          }}
        >
          <BlockTitle>
            <TitleText children={"Nabız"} size={24} />
            <FontAwesome5 name="heart" size={40} color="#F73059" />
          </BlockTitle>
          <ProgressCircle
            style={{
              height: 250,
              top: "10%",
              width: "80%",
              alignSelf: "center",
            }}
            progress={(heartBeatItem - 30) / 100}
            progressColor={colors.text}
            backgroundColor={colors.white}
            strokeWidth={30}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
          >
            <TopTextContainer>
              <TopTextRow>
                <TopTextNumber>{heartBeatItem}</TopTextNumber>
                <TopText>BPM</TopText>
              </TopTextRow>
            </TopTextContainer>
          </ProgressCircle>
        </View>
      </BlockContainer>
      <BlockContainer>
        <View
          style={{
            flex: 1,
          }}
        >
          <BlockTitle>
            <TitleText children={"Saturasyon"} size={24} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setShowSaveModal(true)}>
                <FontAwesome5 name="stop-circle" size={40} color="#F73059" />
              </TouchableOpacity>
            </View>
          </BlockTitle>
          <ProgressCircle
            style={{
              height: 250,
              top: "10%",
              width: "80%",
              alignSelf: "center",
            }}
            progress={oxiPerItem / 100}
            progressColor={colors.text}
            backgroundColor={colors.white}
            strokeWidth={30}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
          >
            {/* <Text style={{ position: "absolute", left: "50%", top: 80 }}>
              SPO2
            </Text> */}
            <TopTextContainer>
              <TopTextRow>
                <TopTextNumber>{oxiPerItem}</TopTextNumber>
                <TopText>%</TopText>
              </TopTextRow>
            </TopTextContainer>
          </ProgressCircle>
        </View>
      </BlockContainer>
      <SaveQuestionModal
        showSaveModal={showSaveModal}
        noSaveHandler={noSaveHandler}
        saveHandler={saveHandler}
      />
      {/* <Modal visible={waitingModal} transparent={true}>
        <View
          style={{
            backgroundColor: "rgba(202,216,222,0.8)",
            width: "100%",
            height: "100%",
          }}
        >
          <Lottie
            source={require("../assets/lottie/Loading-modal.json")}
            style={{ flex: 1 }}
            autoPlay
          />
        </View>
      </Modal> */}
    </PanelContentContainer>
  );
};
export default OximConnect;
