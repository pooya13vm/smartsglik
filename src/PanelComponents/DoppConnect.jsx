import { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { colors } from "../assets/utility/colors";
import { BlockContainer, PanelContentContainer, BlockTitle } from "../styles";
import { ProgressCircle } from "react-native-svg-charts";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import Share from "react-native-share";
import { TitleText } from "../components/TitleText";
import VoiceSVG from "../components/VoiceSVG";
import styled from "styled-components";
import ModalContainer from "../components/ModalContainer";
import { DescriptionText } from "../components/DescriptionText";
import Slider from "@react-native-community/slider";
import { AppContext } from "../context/mainContext";
import uuid from "react-native-uuid";

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

const DoppConnect = ({ disconnectBluetooth }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinishedRec, setIsFinishedRec] = useState(false);
  const [svgHeight, setSVGHeight] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [soundObject, setSoundObject] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(Number);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [standbyMode, setStandbyMode] = useState(false);

  const { saveSoundToStorage, heartBeat, setHeartBeat, message } =
    useContext(AppContext);

  function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes} : ${seconds}`;
  }
  // ----------------------- share sound ---------------------->
  const shareRecording = async () => {
    try {
      const options = {
        url: recording.getURI(),
        type: "audio/m4a",
        message: "çocuk kalbimin kayıtlı sesi",
      };
      await Share.open(options);
    } catch (error) {
      console.log("Error sharing sound:", error.message);
    }
  };
  // ----------------------- start recording sound ---------------------->
  async function startRecording() {
    try {
      setStandbyMode(false);
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      setIsFinishedRec(false);
      setIsRecording(true);
    } catch (error) {
      console.log(error);
    }
  }
  // ----------------------- stop recording sound ---------------------->
  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      if (heartBeat.length > 0) {
        const { sound } = await recording.createNewLoadedSoundAsync();

        const average =
          heartBeat.length > 0
            ? Math.floor(
                heartBeat.reduce((a, b) => a + b, 0) / heartBeat.length
              )
            : 0;
        let mySoundObj = {
          sound: sound,
          id: uuid.v4(),
          beatArray: heartBeat,
          date: new Date().toString(),
          uri: recording.getURI(),
          average: average,
          duration: recordingTime,
        };
        setSoundObject(mySoundObj);
        setIsVisibleModal(true);
        setStandbyMode(true);
      } else {
        Alert.alert("Cihazdan bilgi alınmadı");
        setRecordingTime(0);
        setSoundObject({});
        setSliderValue(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ----------------------- start playing sound ---------------------->
  async function playSound() {
    setIsPlaying(true);
    await soundObject.sound.playAsync();
    const status = await soundObject.sound.getStatusAsync();
    soundObject.sound.setOnPlaybackStatusUpdate((status) => {
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
      await soundObject.sound.stopAsync();
      setIsPlaying(false);
    }
  };
  // -----------------------save handlers ---------------------->
  const saveHandler = () => {
    saveSoundToStorage(soundObject);
    setIsVisibleModal(false);
    setIsFinishedRec(true);
    setHeartBeat([]);
    // disconnectBluetooth();
  };
  const noSaveHandler = () => {
    setIsVisibleModal(false);
    setHeartBeat([]);
    setRecordingTime(0);
    setSoundObject({});
    setSliderValue(0);
    disconnectBluetooth();
  };

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    if (!standbyMode) {
      if (heartBeat.indexOf(message) == -1) {
        if (message != 0 && message !== null && message !== NaN)
          setHeartBeat([...heartBeat, message]);
      }
    }
  }, [message]);

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        recording.getStatusAsync().then((status) => {
          const { isRecording, durationMillis, metering } = status;
          setRecordingTime(durationMillis);
          setSVGHeight(metering + 125);
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [recording]);

  return (
    <PanelContentContainer>
      <BlockContainer>
        <View
          style={{
            flex: 1,
          }}
        >
          <BlockTitle>
            <TitleText children={"Kalp Atışı"} size={24} />
            <FontAwesome5 name="heart" size={40} color="#F73059" />
          </BlockTitle>
          <ProgressCircle
            style={{
              height: 250,
              top: "10%",
              width: "80%",
              alignSelf: "center",
            }}
            progress={(message - 70) / 130}
            progressColor={colors.text}
            backgroundColor={colors.white}
            strokeWidth={30}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
          >
            <TopTextContainer>
              <TopTextRow>
                <TopTextNumber>{isNaN(message) ? 0 : message}</TopTextNumber>
                <TopText>BPM</TopText>
              </TopTextRow>
            </TopTextContainer>
          </ProgressCircle>
        </View>
      </BlockContainer>
      <BlockContainer>
        <BlockTitle>
          <TitleText children={"Ses Kaydı"} size={24} />

          {isRecording ? (
            <TouchableOpacity onPress={stopRecording}>
              <MaterialCommunityIcons
                name="stop-circle-outline"
                size={40}
                color="#F73059"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <MaterialCommunityIcons
                name="record-circle-outline"
                size={40}
                color="#F73059"
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 60,
            }}
          >
            {isFinishedRec && (
              <View
                style={{
                  height: 160,
                  justifyContent: "space-between",
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: colors.text,
                }}
              >
                <TouchableOpacity onPress={stopPlaySound}>
                  <MaterialCommunityIcons
                    name={"stop-circle-outline"}
                    size={40}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={playSound}>
                  <MaterialCommunityIcons
                    name={"play-circle-outline"}
                    size={40}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={shareRecording}>
                  <MaterialCommunityIcons
                    name={"share"}
                    size={40}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BlockTitle>

        {isRecording && (
          <>
            <Text
              style={{
                fontSize: 22,
                color: colors.text,
                fontWeight: "700",
                textDecorationLine: "underline",
                marginLeft: 30,
              }}
            >
              {`${formatTime(recordingTime)}`}
            </Text>
            <VoiceSVG svgHeight={svgHeight} />
          </>
        )}
        {isFinishedRec && (
          <>
            <Text
              style={{
                fontSize: 22,
                color: colors.text,
                fontWeight: "700",
                textDecorationLine: "underline",
                marginLeft: 30,
              }}
            >
              {formatTime(sliderValue)}
            </Text>
            <Slider
              style={{
                height: 50,
                width: "75%",
                marginTop: "15%",
              }}
              step={1}
              thumbTintColor={colors.text}
              value={sliderValue}
              minimumValue={0}
              maximumValue={recordingTime}
              disabled={true}
            />
          </>
        )}
      </BlockContainer>

      {/* ---------------modal--------- */}
      <ModalContainer isModalVisible={isVisibleModal} heightPercentage={50}>
        <MaterialIcons
          name="report"
          size={75}
          color={colors.text}
          style={{ alignSelf: "center", marginBottom: 20 }}
        />
        <DescriptionText
          children={
            "Kaydetmek İstiyor musun ? Cevabınız ' Evet ' ise geçmiş kayıtlarda görünecek, Cevabınız ' Hayır ' ise bu kayıt silinecek."
          }
          size={21}
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            marginTop: "20%",
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: colors.text,
              borderWidth: 2.5,
              paddingVertical: 7,
              alignItems: "center",
              borderRadius: 10,
              width: "35%",
            }}
            onPress={noSaveHandler}
          >
            <Text
              style={{ color: colors.text, fontWeight: "500", fontSize: 16 }}
            >
              Hayır
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.text,
              paddingVertical: 7,
              alignItems: "center",
              borderRadius: 10,
              width: "35%",
            }}
            onPress={saveHandler}
          >
            <Text
              style={{ color: colors.white, fontWeight: "500", fontSize: 16 }}
            >
              Evet
            </Text>
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </PanelContentContainer>
  );
};
export default DoppConnect;
