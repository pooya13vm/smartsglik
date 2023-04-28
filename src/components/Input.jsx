import React from "react";
import { TextInput, useWindowDimensions, View } from "react-native";
import { colors } from "../assets/utility/colors";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export const Input = ({
  onChangeFun,
  placeholder,
  iconName,
  onFocus,
  isWeight = false,
  keyboard = "default",
  placeholderColor = colors.midBlue,
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={{
        display: "flex",
        width: (width * 80) / 100,
        height: 46,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: colors.lightBlue,
        borderRadius: 25,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: 50,
          alignItems: "center",
          borderRightWidth: 2,
          borderRightColor: colors.text,
        }}
      >
        {!isWeight ? (
          <FontAwesome
            name={iconName}
            size={24}
            color={colors.text}
            style={{ zIndex: 10000, paddingLeft: 10 }}
          />
        ) : (
          <FontAwesome5
            name={iconName}
            size={24}
            color={colors.text}
            style={{ zIndex: 10000, paddingLeft: 10 }}
          />
        )}
      </View>

      <TextInput
        style={{
          paddingLeft: 10,
          width: "100%",
          height: "100%",
          textDecorationLine: "none",
          color: colors.text,
          fontSize: 18,
          fontWeight: "500",
          textDecorationColor: colors.text,
        }}
        textContentType="date"
        onChangeText={onChangeFun}
        placeholder={placeholder}
        onFocus={onFocus}
        keyboardType={keyboard}
        placeholderTextColor={placeholderColor}
      />
    </View>
  );
};
