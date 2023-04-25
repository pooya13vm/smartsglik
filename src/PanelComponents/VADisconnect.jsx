import { Dimensions, View } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import VA from "../assets/SVGs/VA1.svg";
import LinkGroup from "../components/LinkGroup";

const VADisconnect = () => {
  const { width } = Dimensions.get("window");

  return (
    <PanelContentContainer>
      <TitleText children={"Smart"} size={24} />
      <TitleText children={"Vücut Analizi"} size={24} />
      <CarouselContainer>
        <View
          style={{
            height: 500,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: "60%",
          }}
        >
          <VA width={(width * 80) / 100} />
        </View>
      </CarouselContainer>
      <LinkGroup
        url1={
          "https://www.sush.com.tr/wp-content/uploads/2023/02/Smart-Vucut-Analizi-Kullanim-Kilavuzu.pdf"
        }
      />
    </PanelContentContainer>
  );
};
export default VADisconnect;
