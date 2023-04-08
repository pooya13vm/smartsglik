import { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";

export default function ButtonModal({
  isVisible,
  setSelectedSex,
  sexModalCloseHandler,
}) {
  const [maleIsSelected, setMaleSelected] = useState(false);
  const [femaleIsSelected, setFemaleSelected] = useState(false);
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          height: "25%",
          width: "100%",
          backgroundColor: colors.lightBlue,
          borderTopRightRadius: 18,
          borderTopLeftRadius: 18,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View
          style={{
            height: "16%",
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
            Cinsiyetinizi Seçsin
          </Text>
          <TouchableOpacity onPress={() => sexModalCloseHandler()}>
            <FontAwesome name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "7%",
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              borderColor: colors.text,
              backgroundColor: maleIsSelected ? colors.white : colors.lightBlue,
            }}
            onPress={() => {
              setSelectedSex("Erkek");
              setMaleSelected(true);
              setFemaleSelected(false);
            }}
          >
            <FontAwesome name="male" size={45} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              borderColor: colors.text,
              backgroundColor: femaleIsSelected
                ? colors.white
                : colors.lightBlue,
            }}
            onPress={() => {
              setSelectedSex("Bayan");
              setFemaleSelected(true);
              setMaleSelected(false);
            }}
          >
            <FontAwesome name="female" size={45} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
