import React from "react";
import { useWindowDimensions, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/utility/colors";

export const FormScreenBg = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[colors.white, colors.lightBlue]}
        style={{ height: height, width: width }}
        start={{ x: 0.0, y: 0.1 }}
        locations={[0.3, 0.9]}
        end={{ x: 0.0, y: 1.4 }}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};
