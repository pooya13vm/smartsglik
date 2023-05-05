import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import { BottomModalContainer } from "../styles";

const ShareButtonModal = ({
  visibility,
  setVisibility,
  sound,
  shareSound,
  shareData,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visibility}>
      <BottomModalContainer>
        <View
          style={{
            height: "20%",
            backgroundColor: colors.midBlue,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
            Paylaşımı Seçiniz
          </Text>
          <TouchableOpacity onPress={() => setVisibility(false)}>
            <FontAwesome name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          {sound && (
            <TouchableOpacity
              onPress={shareSound}
              style={{
                backgroundColor: colors.midBlue,
                width: "80%",
                height: 60,
                justifyContent: "center",
                borderRadius: 15,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "700", color: colors.text }}
              >
                Ses Kaydını Paylaş
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={shareData}
            style={{
              backgroundColor: colors.midBlue,
              width: "80%",
              height: 60,
              justifyContent: "center",
              borderRadius: 15,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "700", color: colors.text }}
            >
              Datayı Paylaş
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModalContainer>
    </Modal>
  );
};

export default ShareButtonModal;
