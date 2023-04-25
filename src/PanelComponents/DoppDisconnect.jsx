import { useEffect, useContext, useState } from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import Carousel from "react-native-reanimated-carousel";
import Dop1 from "../assets/SVGs/dopp1.svg";
import Dop2 from "../assets/SVGs/dopp2.svg";
import Dop3 from "../assets/SVGs/dopp3.svg";
import LinkGroup from "../components/LinkGroup";
import { AppContext } from "../context/mainContext";
import ModalContainer from "../components/ModalContainer";
import uuid from "react-native-uuid";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import { DescriptionText } from "../components/DescriptionText";

const DoppDisconnect = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { heartBeat, setHeartBeat, saveSoundToStorage } =
    useContext(AppContext);
  const width = Dimensions.get("window").width;
  console.log(heartBeat);
  const carouselData = [
    {
      id: 1,
      image: <Dop1 width={(width * 70) / 100} />,
    },
    {
      id: 2,
      image: <Dop2 width={(width * 70) / 100} />,
    },
    {
      id: 3,
      image: <Dop3 width={(width * 70) / 100} />,
    },
  ];
  useEffect(() => {
    if (heartBeat?.length > 0) {
      setShowSaveModal(true);
    }
  }, []);
  const noSaveHandler = () => {
    setShowSaveModal(false);
    setHeartBeat([]);
  };
  const saveHandler = () => {
    const average =
      heartBeat.length > 0
        ? Math.floor(heartBeat.reduce((a, b) => a + b, 0) / heartBeat.length)
        : 0;
    let itemObject = {
      sound: null,
      id: uuid.v4(),
      beatArray: heartBeat,
      date: new Date(),
      uri: null,
      average: average,
      duration: 0,
    };
    saveSoundToStorage(itemObject);
    setShowSaveModal(false);
    setHeartBeat([]);
  };
  return (
    <PanelContentContainer>
      <TitleText children={"Smart"} size={24} />
      <TitleText children={"Fetal Doppler"} size={24} />
      <CarouselContainer>
        <Carousel
          loop
          data={carouselData}
          style={{ alignSelf: "center" }}
          width={(width * 90) / 100}
          height={500}
          autoPlay={true}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 390,
                }}
              >
                {item.image}
              </View>
            );
          }}
        />
      </CarouselContainer>
      <LinkGroup url1="https://www.sush.com.tr/wp-content/uploads/2023/02/Smart-Fetal-Doppler-Kullanim-Kilavuzu.pdf" />
      {/* ---------------modal--------- */}
      <ModalContainer isModalVisible={showSaveModal} heightPercentage={50}>
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
            marginTop: "30%",
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
export default DoppDisconnect;
