import ModalContainer from "./ModalContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { DescriptionText } from "./DescriptionText";
import { View, TouchableOpacity, Text } from "react-native";
import { colors } from "../assets/utility/colors";

export const SaveQuestionModal = ({
  showSaveModal,
  noSaveHandler,
  saveHandler,
}) => {
  return (
    <ModalContainer isModalVisible={showSaveModal} heightPercentage={50}>
      <MaterialIcons
        name="report"
        size={75}
        color={colors.text}
        style={{ alignSelf: "center", marginBottom: 20 }}
      />
      <DescriptionText
        children={"Bu Ölçümü Kaydetmek İstiyor musun?"}
        size={19}
      />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          justifyContent: "space-between",
          marginTop: "15%",
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: colors.text,
            borderWidth: 2.5,
            paddingVertical: 7,
            alignItems: "center",
            borderRadius: 10,
            width: "35%",
          }}
          onPress={noSaveHandler}
        >
          <Text style={{ color: colors.text, fontWeight: "500", fontSize: 16 }}>
            Hayır
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.text,
            paddingVertical: 7,
            alignItems: "center",
            borderRadius: 10,
            width: "35%",
          }}
          onPress={saveHandler}
        >
          <Text
            style={{ color: colors.white, fontWeight: "500", fontSize: 16 }}
          >
            Evet
          </Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};
