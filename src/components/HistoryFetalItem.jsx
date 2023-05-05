import { useEffect, useState, useContext } from "react";
import { BlockContainer } from "../styles";
import { FontAwesome5, AntDesign, Fontisto } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../assets/utility/colors";
import styled from "styled-components";
import { Audio } from "expo-av";
import Share from "react-native-share";
import * as FileSystem from "expo-file-system";
import { WarningModal } from "./WarningModal";
import { AppContext } from "../context/mainContext";
import { makeTurkishDate } from "../assets/utility/makeTurkishDate";
import ShareButtonModal from "./ShareButtonModal";

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
  opacity: ${(props) => (props.opacity ? 0.7 : 1)};
`;

const HistoryFetalItem = ({ selectedItem, setSelectedItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [item, setItem] = useState({ date: "0000000000000000000" });
  const [sliderValue, setSliderValue] = useState(Number);
  const [recordingTime, setRecordingTime] = useState(0);
  const [sound, setSound] = useState();
  const [warningModalV, SetWarningModalV] = useState(false);
  const [SMVisible, setSMVisible] = useState(false);
  const [hasSound, setHasSound] = useState(Boolean);

  const { dopDataArray, setDopDataArray, saveSoundDeletedToStorage } =
    useContext(AppContext);

  // ----------------------- start playing sound ---------------------->
  async function playSound() {
    if (item.sound) {
      setIsPlaying(true);
      await sound.playAsync();
      const status = await sound.getStatusAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        setSliderValue(status.positionMillis);
        if (status.didJustFinish) {
          setIsPlaying(false);
          setSliderValue(0);
        }
      });
    }
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
    if (item.sound) {
      try {
        const options = {
          url: item.uri,
          type: "audio/m4a",
          message: "çocuk kalbimin kayıtlı sesi",
        };
        await Share.open(options);
      } catch (error) {
        console.log("Error sharing sound:", error.message);
      }
    }
  };
  const shareData = async () => {
    console.log(item);
    try {
      const options = {
        type: "text",
        message: `Tarih : ${makeTurkishDate(item.date)}
Ort : ${item.average}
Min : ${Math.min.apply(Math, item.beatArray)}
Maks : ${Math.max.apply(Math, item.beatArray)}
Nabız Sayısı : ${item.beatArray.join("   ")}
`,
      };
      await Share.open(options);
    } catch (error) {
      console.log("Error sharing sound:", error.message);
    }
  };
  // ----------------------- delete sound ---------------------->
  async function deleteSoundFile() {
    try {
      if (item.sound) {
        await FileSystem.deleteAsync(item.uri);
      }
      const filtered = dopDataArray.filter((item) => item.id !== selectedItem);
      saveSoundDeletedToStorage(filtered);
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
    setRecordingTime(item[0]?.duration);
    if (item[0].sound) {
      setHasSound(true);
    } else {
      setHasSound(false);
    }
    async function loadSound() {
      const source = {
        uri: `${item[0].uri}`,
      };
      const { sound } = await Audio.Sound.createAsync(source);
      setSound(sound);
    }
    loadSound();
  }, []);

  return (
    <>
      <BlockContainer>
        <InsideContainer>
          <IconContainer>
            <AntDesignContainer onPress={() => setSelectedItem(null)}>
              <AntDesign name="back" size={24} color={colors.text} />
            </AntDesignContainer>
            <FontAwesomeContainer
              onPress={() => {
                setSMVisible(true);
              }}
            >
              <FontAwesome5 name="share-alt" size={24} color={colors.text} />
            </FontAwesomeContainer>
            <FontAwesomeContainer onPress={() => SetWarningModalV(true)}>
              <FontAwesome5 name="trash-alt" size={24} color={colors.text} />
            </FontAwesomeContainer>

            <FontAwesomeContainer
              onPress={!isPlaying ? playSound : stopPlaySound}
              disabled={!item.sound && true}
              opacity={!item.sound && true}
            >
              <FontAwesome5
                name={isPlaying ? "stop" : "play"}
                size={24}
                color={colors.text}
              />
            </FontAwesomeContainer>
          </IconContainer>
          <Row>
            <TitleText>{`Min : ${Math.min.apply(
              Math,
              item.beatArray
            )}     `}</TitleText>
            <Fontisto name="heartbeat-alt" size={33} color={colors.text} />
            <TitleText>{`     Maks : ${Math.max.apply(
              Math,
              item.beatArray
            )}`}</TitleText>
          </Row>
          <Row>
            <TitleText>{makeTurkishDate(item.date)}</TitleText>
          </Row>
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
        message="Öğeyi silmek istediğinize emin misiniz?"
        result={true}
        resultFunction={deleteSoundFile}
      />
      <ShareButtonModal
        visibility={SMVisible}
        setVisibility={setSMVisible}
        sound={hasSound}
        shareSound={shareRecording}
        shareData={shareData}
      />
    </>
  );
};

export default HistoryFetalItem;
