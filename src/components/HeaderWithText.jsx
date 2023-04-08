import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import { TitleText } from "./TitleText";

const HeaderWithText = ({ Title, Icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 80,
      }}
    >
      <Ionicons
        name={Icon}
        size={50}
        color={colors.text}
        style={{ marginLeft: 30 }}
      />
      <View style={{ marginLeft: 30 }}>
        <TitleText children={Title} size={28} />
      </View>
    </View>
  );
};
export default HeaderWithText;
