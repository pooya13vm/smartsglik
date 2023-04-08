import React from "react";
import { Text } from "react-native";
import { colors } from "../assets/utility/colors";

export const DescriptionText = ({ children, size = 24 }) => {
  return (
    <>
      <Text
        style={{
          fontSize: size,
          color: colors.text,
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </>
  );
};
