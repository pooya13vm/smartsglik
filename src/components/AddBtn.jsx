import { TouchableOpacity } from "react-native";
import { colors } from "../assets/utility/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const AddBtn = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.white,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.darkBlue,
        alignSelf: "flex-end",
      }}
      onPress={onPress}
    >
      <FontAwesome5 name={icon} size={24} color={colors.darkBlue} />
    </TouchableOpacity>
  );
};
export default AddBtn;
