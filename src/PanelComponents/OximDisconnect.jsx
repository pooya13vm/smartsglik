import { useEffect, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import Oxi from "../assets/SVGs/oxi.svg";
import LinkGroup from "../components/LinkGroup";
import { AppContext } from "../context/mainContext";
import { SaveQuestionModal } from "../components/SaveQuestionModal";
import uuid from "react-native-uuid";

const OximDisconnect = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { width } = Dimensions.get("window");
  const {
    heartBeat,
    setHeartBeat,
    setOxiPer,
    startTime,
    oxiPer,
    saveNewOxiItem,
  } = useContext(AppContext);

  useEffect(() => {
    if (heartBeat.length > 0) {
      // setShowSaveModal(true);
      setHeartBeat([]);
    }
  }, []);
  const noSaveHandler = () => {
    setShowSaveModal(false);
    setHeartBeat([]);
    setOxiPer([]);
  };
  const saveHandler = () => {
    const itemObj = {
      id: uuid.v4,
      startTime: startTime.toString(),
      stopTime: new Date().toString(),
      heartArray: heartBeat,
      oxiArray: oxiPer,
    };
    saveNewOxiItem(itemObj);
    noSaveHandler();
  };

  return (
    <PanelContentContainer>
      <TitleText children={"Smart"} size={24} />
      <TitleText children={"Yüzük Oksimetre"} size={24} />
      <CarouselContainer>
        <Oxi width={(width * 70) / 100} height={380} />
      </CarouselContainer>
      <LinkGroup
        url1={
          "https://www.sush.com.tr/wp-content/uploads/2023/02/Smart-Yuzuk-Oksimetre-Kullanim-Kilavuzu.pdf"
        }
        url2={"https://youtu.be/GJ684JzDx0U"}
      />
      <SaveQuestionModal
        showSaveModal={showSaveModal}
        noSaveHandler={noSaveHandler}
        saveHandler={saveHandler}
      />
    </PanelContentContainer>
  );
};
export default OximDisconnect;
