import { View, Dimensions } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import Carousel from "react-native-reanimated-carousel";
import EKG1 from "../assets/SVGs/EKG1.svg";
import EKG2 from "../assets/SVGs/EKG2.svg";
import EKG3 from "../assets/SVGs/EKG3.svg";
import LinkGroup from "../components/LinkGroup";

const EKGDisconnect = () => {
  const { width, height } = Dimensions.get("window");
  const carouselData = [
    {
      id: 1,
      image: <EKG1 width={(width * 70) / 100} />,
    },
    {
      id: 2,
      image: <EKG2 width={(width * 70) / 100} />,
    },
    {
      id: 3,
      image: <EKG3 width={(width * 70) / 100} />,
    },
  ];
  return (
    <PanelContentContainer>
      <TitleText children={"Smart"} size={24} />
      <TitleText children={"Mobil EKG"} size={24} />
      <CarouselContainer>
        <Carousel
          loop
          data={carouselData}
          width={(width * 90) / 100}
          style={{
            alignSelf: "center",
          }}
          height={350}
          autoPlay={true}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.image}
              </View>
            );
          }}
        />
      </CarouselContainer>
      <LinkGroup
        url1={
          "https://www.sush.com.tr/wp-content/uploads/2023/02/Smart-Mobil-EKG-Kullanim-Kilavuzu.pdf"
        }
      />
    </PanelContentContainer>
  );
};
export default EKGDisconnect;
