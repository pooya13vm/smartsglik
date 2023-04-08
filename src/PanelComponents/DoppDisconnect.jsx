import { View, Dimensions } from "react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import Carousel from "react-native-reanimated-carousel";
import Dop1 from "../assets/SVGs/dopp1.svg";
import Dop2 from "../assets/SVGs/dopp2.svg";
import Dop3 from "../assets/SVGs/dopp3.svg";
import LinkGroup from "../components/LinkGroup";

const DoppDisconnect = () => {
  const width = Dimensions.get("window").width;
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
      <LinkGroup />
    </PanelContentContainer>
  );
};
export default DoppDisconnect;
