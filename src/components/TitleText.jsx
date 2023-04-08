import React from "react";
import { Text } from "react-native";
import { colors } from "../assets/utility/colors";

export const TitleText = ({ children, size = 32 }) => {
  return (
    <>
      <Text
        style={{
          fontSize: size,
          color: colors.text,
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </>
  );
};
