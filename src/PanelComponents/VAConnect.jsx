import { View, Dimensions } from "react-native";
import Lottie from "lottie-react-native";
import { TitleText } from "../components/TitleText";
import { CarouselContainer, PanelContentContainer } from "../styles";
import VA from "../assets/SVGs/VA2.svg";

const VAConnect = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <View>
      <PanelContentContainer>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "flex-end",
            marginBottom: 70,
          }}
        >
          <TitleText children={`86`} size={65} />
          <TitleText children={` kg`} size={30} />
        </View>
        <CarouselContainer>
          <VA width={(width * 60) / 100} />
        </CarouselContainer>
        <View
          style={{
            width: 300,
            alignItems: "center",
            height: 150,
            alignSelf: "center",
          }}
        >
          <Lottie
            source={require("../assets/lottie/loading.json")}
            style={{ flex: 1 }}
            autoPlay={true}
            loop={true}
          />
        </View>
      </PanelContentContainer>
    </View>
  );
};
export default VAConnect;
