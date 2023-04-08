import React from "react";
import { useWindowDimensions, SafeAreaView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/utility/colors";

const ScreenLayout = ({ children, header }) => {
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[colors.midBlue, colors.white, colors.midBlue]}
        style={{ height: height, width: width }}
      >
        <View
          style={{
            height: 80,
            backgroundColor: colors.white,
            borderBottomStartRadius: 25,
            borderBottomEndRadius: 25,
            marginTop: 3,
          }}
        >
          {header}
        </View>
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};
export default ScreenLayout;
