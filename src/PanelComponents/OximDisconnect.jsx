import { Dimensions } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import Oxi from "../assets/SVGs/oxi.svg";
import LinkGroup from "../components/LinkGroup";

const OximDisconnect = () => {
  const { width } = Dimensions.get("window");

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
      />
    </PanelContentContainer>
  );
};
export default OximDisconnect;
