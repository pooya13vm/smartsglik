import { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
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

const OximConnect = ({ message, disconnectBluetooth }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [heartBeatItem, setHeartBeatItem] = useState(0);
  const [oxiPerItem, setOxiPerItem] = useState(0);
  const [waitingModal, setWaitingModal] = useState(true);

  const {
    heartBeat,
    setHeartBeat,
    oxiPer,
    setOxiPer,
    startTime,
    setStartTime,
    saveNewOxiItem,
  } = useContext(AppContext);

  useEffect(() => {
    if (!startTime) setStartTime(new Date());
    if (message[0] > 0 && message[0] < 220) {
      setWaitingModal(false);
      setHeartBeatItem(message[0]);
      setOxiPerItem(message[1]);
      setHeartBeat([...heartBeat, message[0]]);
      setOxiPer([...oxiPer, message[1]]);
    }
  }, [message[0]]);

  function averageGroups(arr) {
    const result = [];

    if (arr.length <= 20) {
      // If the array is too short or too long, return an empty array

      return arr;
    } else if (arr.length <= 40) {
      // If the array has less than 40 elements, average each consecutive pair
      for (let i = 0; i < arr.length - 1; i += 2) {
        const pair = [arr[i], arr[i + 1]];
        const avg = getAverage(pair);
        result.push(avg);
      }
    } else if (arr.length <= 60) {
      // If the array has between 40 and 60 elements, average each consecutive triplet
      for (let i = 0; i < arr.length - 2; i += 3) {
        const triplet = [arr[i], arr[i + 1], arr[i + 2]];
        const avg = getAverage(triplet);
        result.push(avg);
      }
    } else if (arr.length <= 100) {
      // If the array has between 60 and 100 elements, average each consecutive group of 5
      for (let i = 0; i < arr.length - 4; i += 5) {
        const group = arr.slice(i, i + 5);
        const avg = getAverage(group);
        result.push(avg);
      }
    } else if (arr.length <= 200) {
      // If the array has between 100 and 200 elements, average each consecutive group of 10
      for (let i = 0; i < arr.length - 9; i += 10) {
        const group = arr.slice(i, i + 10);
        const avg = getAverage(group);
        result.push(avg);
      }
    } else if (arr.length <= 400) {
      // If the array has between 200 and 400 elements, average each consecutive group of 20
      for (let i = 0; i < arr.length - 19; i += 20) {
        const group = arr.slice(i, i + 20);
        const avg = getAverage(group);
        result.push(avg);
      }
    } else if (arr.length < 600) {
      // If the array has between 400 and 600 elements, average each consecutive group of 30
      for (let i = 0; i < arr.length - 29; i += 30) {
        const group = arr.slice(i, i + 30);
        const avg = getAverage(group);
        result.push(avg);
      }
    } else if (arr.length >= 600) {
      // If the array has more than 600 elements, average each consecutive group of 60
      for (let i = 0; i < arr.length - 59; i += 60) {
        const group = arr.slice(i, i + 60);
        const avg = getAverage(group);
        result.push(avg);
      }
    }
    return result;
  }
  function findMinMax(numbers) {
    if (numbers.length === 0) {
      // Handle empty array
      return {
        min: undefined,
        max: undefined,
      };
    }

    let min = numbers[0];
    let max = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i];
      }
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }

    return {
      min: min,
      max: max,
    };
  }
  const oxiReportMaker = (arr) => {
    let top = 0;
    let middle = 0;
    let down = 0;
    arr.map((item) => {
      if (item >= 95) top += 1;
      if (item < 95 && item >= 90) middle += 1;
      if (item > 95) down += 1;
    });
    return { top, middle, down };
  };
  const heartReportMaker = (arr) => {
    let top = 0;
    let middle = 0;
    let down = 0;
    arr.map((item) => {
      if (item >= 120) top += 1;
      if (item < 120 && item >= 50) middle += 1;
      if (item > 50) down += 1;
    });
    return { top, middle, down };
  };
  function getAverage(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }
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
      <Modal visible={waitingModal} transparent={true}>
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
      </Modal>
    </PanelContentContainer>
  );
};
export default OximConnect;
