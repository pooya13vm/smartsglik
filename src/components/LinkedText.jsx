import { useCallback } from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { colors } from "../assets/utility/colors";

const LinkedText = ({ url, text, size = 15 }) => {
  const handleURLPress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity onPress={handleURLPress}>
      <Text
        style={{ fontWeight: "500", color: colors.linkText, fontSize: size }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default LinkedText;