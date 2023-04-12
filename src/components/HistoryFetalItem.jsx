import { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BlockContainer } from "../styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../assets/utility/colors";
import styled from "styled-components";
import { Audio } from "expo-av";
import Share from "react-native-share";
import * as FileSystem from "expo-file-system";
import { WarningModal } from "./WarningModal";
import { AppContext } from "../context/mainContext";

const InsideContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
const Row = styled.View`
  flex-direction: row;
`;
const TitleText = styled.Text`
  font-size: 15px;
  color: ${colors.text};
  font-weight: 700;
`;
const IconContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;
const AntDesignContainer = styled.TouchableOpacity`
  border-width: 2px;
  padding-vertical: 15px;
  padding-horizontal: 16px;
  border-radius: 50px;
  border-color: ${colors.text};
`;
const FontAwesomeContainer = styled.TouchableOpacity`
  border-width: 2px;
  padding-vertical: 15px;
  padding-horizontal: 18px;
  border-radius: 50px;
  border-color: ${colors.text};
`;
const PlayControlContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const HistoryFetalItem = ({ selectedItem, setSelectedItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [item, setItem] = useState({ date: "0000000000000000000" });
  const [sliderValue, setSliderValue] = useState(Number);
  const [recordingTime, setRecordingTime] = useState(0);
  const [sound, setSound] = useState();
  const [warningModalV, SetWarningModalV] = useState(false);

  const { dopDataArray, setDopDataArray } = useContext(AppContext);

  // ----------------------- start playing sound ---------------------->
  async function playSound() {
    setIsPlaying(true);
    await sound.playAsync();
    const status = await sound.getStatusAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      console.log("my in status :", status.positionMillis);
      setSliderValue(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setSliderValue(0);
      }
    });
  }
  // ----------------------- stop playing sound ---------------------->
  const stopPlaySound = async () => {
    if (isPlaying) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };
  // ----------------------- share sound ---------------------->
  const shareRecording = async () => {
    try {
      const options = {
        url: item.uri,
        type: "audio/m4a",
        message: "çocuk kalbimin kayıtlı sesi",
      };
      await Share.open(options);
      console.log("Sound shared successfully");
    } catch (error) {
      console.log("Error sharing sound:", error.message);
    }
  };
  // ----------------------- delete sound ---------------------->
  async function deleteSoundFile() {
    try {
      // Delete the sound file using the Expo FileSystem API
      await FileSystem.deleteAsync(item.uri);
      console.log(`Sound file at ${item.uri} was deleted successfully`);
      const filtered = dopDataArray.filter((item) => item.id !== selectedItem);
      setDopDataArray(filtered);
      setSelectedItem(null);
    } catch (error) {
      console.error(
        `An error occurred while deleting sound file at ${item.uri}: ${error}`
      );
    }
  }

  useEffect(() => {
    const item = dopDataArray.filter((item) => item.id == selectedItem);
    setItem(item[0]);
    setRecordingTime(item[0].duration);
    async function loadSound() {
      console.log(item[0].uri);
      const source = {
        uri: `${item[0].uri}`,
      };
      const { sound } = await Audio.Sound.createAsync(source);
      setSound(sound);
    }
    loadSound();
  }, []);
  //   console.log(item.uri);
  return (
    <>
      <BlockContainer>
        <InsideContainer>
          <Row>
            <TitleText>{item.date.slice(0, 10)}</TitleText>
            <TitleText>{`       ${item.date.slice(11, 16)}`}</TitleText>
          </Row>
          <IconContainer>
            <AntDesignContainer onPress={() => setSelectedItem(null)}>
              <AntDesign name="back" size={24} color={colors.text} />
            </AntDesignContainer>
            <AntDesignContainer>
              <AntDesign name="linechart" size={24} color={colors.text} />
            </AntDesignContainer>
            <FontAwesomeContainer onPress={shareRecording}>
              <FontAwesome5 name="share-alt" size={24} color={colors.text} />
            </FontAwesomeContainer>
            <FontAwesomeContainer onPress={() => SetWarningModalV(true)}>
              <FontAwesome5 name="trash-alt" size={24} color={colors.text} />
            </FontAwesomeContainer>
          </IconContainer>
          <PlayControlContainer>
            <FontAwesomeContainer
              onPress={!isPlaying ? playSound : stopPlaySound}
            >
              <FontAwesome5
                name={isPlaying ? "stop" : "play"}
                size={24}
                color={colors.text}
              />
            </FontAwesomeContainer>
          </PlayControlContainer>
          <Slider
            style={{
              height: 50,
              width: "75%",
            }}
            step={1}
            thumbTintColor={colors.text}
            minimumValue={0}
            disabled={true}
            value={sliderValue}
            maximumValue={recordingTime}
          />
        </InsideContainer>
      </BlockContainer>
      <WarningModal
        visibility={warningModalV}
        setVisibility={SetWarningModalV}
        message="öğeyi sileceğinizden emin misiniz?"
        result={true}
        resultFunction={deleteSoundFile}
      />
    </>
  );
};

export default HistoryFetalItem;
