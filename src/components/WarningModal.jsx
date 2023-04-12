import ModalContainer from "./ModalContainer";
import { TitleText } from "./TitleText";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import { View } from "react-native";
import styled from "styled-components";

const ModalOutlineButton = styled.TouchableOpacity`
  border-color: ${colors.text};
  border-width: 2.5px;
  padding-vertical: 7px;
  align-items: center;
  border-radius: 10px;
  width: 35%;
`;
const ModalOutlineButtonText = styled.Text`
  color: ${colors.text};
  font-weight: 500;
`;

export const WarningModal = ({
  visibility,
  setVisibility,
  message,
  result,
  resultFunction,
}) => {
  return (
    <ModalContainer
      heightPercentage={50}
      isModalVisible={visibility}
      animation="fade"
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={80}
          color={colors.text}
        />
        <TitleText children={message} size={22} />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <ModalOutlineButton onPress={() => setVisibility(false)}>
            <ModalOutlineButtonText>
              {result ? "Hayır" : "Tamam"}
            </ModalOutlineButtonText>
          </ModalOutlineButton>
          {result && (
            <ModalOutlineButton onPress={resultFunction}>
              <ModalOutlineButtonText>Evet</ModalOutlineButtonText>
            </ModalOutlineButton>
          )}
        </View>
      </View>
    </ModalContainer>
  );
};
