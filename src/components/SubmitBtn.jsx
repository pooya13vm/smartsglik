import { TouchableOpacity, useWindowDimensions, Text } from "react-native";
import { colors } from "../assets/utility/colors";
import { FontAwesome5 } from "@expo/vector-icons";

export const SubmitBtn = ({
  title,
  onPressFun,
  widthPercentage = 80,
  iconName,
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        style={{
          width: (width * widthPercentage) / 100,
          alignSelf: "center",
          backgroundColor: colors.text,
          height: 46,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
          flexDirection: "row",
        }}
        onPress={onPressFun}
      >
        {iconName && (
          <FontAwesome5
            name={iconName}
            size={22}
            color={colors.white}
            style={{ position: "absolute", left: 20 }}
          />
        )}
        <Text style={{ color: colors.white, fontSize: 20, fontWeight: "700" }}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};
