import { useContext, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  Image,
} from "react-native";
import Lottie from "lottie-react-native";
import { colors } from "../../assets/utility/colors";
import Svg, { Path } from "react-native-svg";
import { AppContext } from "../../context/mainContext";

function SplashScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const { isRegistered, checkStorage, setAppLoading } = useContext(AppContext);

  // const navigation = useNavigation();
  useEffect(() => {
    checkStorage();
  }, []);

  const handleAppStart = () => {
    setAppLoading(true);
    if (isRegistered) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("SignUp");
    }
  };
  return (
    <View
      style={{
        width: width,
        height: height,
        marginBottom: 0,
        paddingBottom: 0,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "relative",
        backgroundColor: colors.white,
      }}
    >
      <StatusBar backgroundColor={colors.midBlue} />
      <View
        style={{
          width: (width * 80) / 100,
          height: (width * 80) / 100,
          alignItems: "center",
        }}
      >
        <Lottie
          source={require("../../assets/images/spalshAnim.json")}
          style={{ flex: 1 }}
          autoPlay
          onAnimationFinish={handleAppStart}
          loop={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.jpeg")}
          style={{ width: 50, height: 50, marginRight: 20 }}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: colors.darkBlue,
          }}
        >
          Smart Sağlık
        </Text>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            ®
          </Text>
        </View>
      </View>
      <View>
        <Text>Versiyon 1.3.9</Text>
      </View>

      <Svg
        height={90}
        width={width}
        viewBox="0 0 1440 310"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Path
          fill="#9CFFFC"
          d="M0,224L48,192C96,160,192,96,288,64C384,32,480,32,576,64C672,96,768,160,864,160C960,160,1056,96,1152,64C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></Path>
      </Svg>
      <Svg
        height={90}
        width={width}
        viewBox="0 0 1440 310"
        style={{
          position: "absolute",
          width: width,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Path
          fill="#30D5C8"
          d="M0,0L40,16C80,32,160,64,240,90.7C320,117,400,139,480,154.7C560,171,640,181,720,197.3C800,213,880,235,960,250.7C1040,267,1120,277,1200,256C1280,235,1360,181,1400,154.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></Path>
      </Svg>
    </View>
  );
}

export default SplashScreen;
