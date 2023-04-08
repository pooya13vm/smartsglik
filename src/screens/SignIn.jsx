import { useState } from "react";
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FormScreenBg } from "../components/FormScreenBg";
import { TitleText } from "../components/TitleText";
import { Input } from "../components/Input";
import { colors } from "../assets/utility/colors";
import { SubmitBtn } from "../components/SubmitBtn";

function SignIn() {
  const { height, width } = useWindowDimensions();
  return (
    <FormScreenBg>
      <View style={{ marginTop: (height * 8) / 100 }}>
        <TitleText>Giriş Yap</TitleText>
      </View>
      <View style={{ marginVertical: (height * 8) / 100 }}>
        <Input placeholder="Email" iconName="envelope" />
        <Input placeholder="Şifre" iconName="lock" />
      </View>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 20 }}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={{ color: colors.text, fontWeight: "500" }}>
          Şifrenizi Mi Unuttunuz ?
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: (height * 30) / 100 }}>
        <SubmitBtn title="Giriş" />
      </View>
    </FormScreenBg>
  );
}

export default SignIn;
