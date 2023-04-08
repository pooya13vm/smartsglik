import { View } from "react-native";
import LinkedText from "../components/LinkedText";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";

const LinkGroup = ({ url1, url2 }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "70%",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <FontAwesome5 name="file-pdf" size={20} color={colors.linkText} />
        </View>

        <LinkedText text="  Kullanım Kılavuzu" size={22} url={url1} />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <FontAwesome5 name="youtube" size={20} color={colors.linkText} />
        </View>
        <LinkedText text="Nasıl Kullanılır - İzle" size={22} url={url2} />
      </View>
    </View>
  );
};
export default LinkGroup;
