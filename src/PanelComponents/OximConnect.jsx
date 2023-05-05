import { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BlockContainer, PanelContentContainer, BlockTitle } from "../styles";
import styled from "styled-components";
import { colors } from "../assets/utility/colors";
import { TitleText } from "../components/TitleText";
import { ProgressCircle } from "react-native-svg-charts";
import { FontAwesome5 } from "@expo/vector-icons";

const TopTextContainer = styled.View`
  position: absolute;
  left: 0;
  top: 100px;
  align-items: center;
`;
const TopTextRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const TopTextNumber = styled.Text`
  font-size: 52px;
  color: ${colors.text};
  font-weight: 700;
`;
const TopText = styled.Text`
  font-size: 22px;
  color: ${colors.text};
  font-weight: 400;
  margin-bottom: 10px;
`;

const OximConnect = ({ message, disconnectBluetooth }) => {
  console.log(message);
  const [heartBeat, setHeartBeat] = useState(0);
  const [oxiPer, setOxiPer] = useState(0);

  useEffect(() => {
    if (message[0] > 0 && message[0] < 220) {
      setHeartBeat(message[0]);
      setOxiPer(message[1]);
    }
  }, [message[0]]);
  return (
    <PanelContentContainer>
      <BlockContainer>
        <View
          style={{
            flex: 1,
          }}
        >
          <BlockTitle>
            <TitleText children={"Nabız"} size={24} />
            <FontAwesome5 name="heart" size={40} color="#F73059" />
          </BlockTitle>
          <ProgressCircle
            style={{
              height: 250,
              top: "10%",
              width: "80%",
              alignSelf: "center",
            }}
            progress={(heartBeat - 30) / 100}
            progressColor={colors.text}
            backgroundColor={colors.white}
            strokeWidth={30}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
          >
            <TopTextContainer>
              <TopTextRow>
                <TopTextNumber>{heartBeat}</TopTextNumber>
                <TopText>BPM</TopText>
              </TopTextRow>
            </TopTextContainer>
          </ProgressCircle>
        </View>
      </BlockContainer>
      <BlockContainer>
        <View
          style={{
            flex: 1,
          }}
        >
          <BlockTitle>
            <TitleText children={"Saturasyon"} size={24} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <FontAwesome5 name="stop-circle" size={40} color="#F73059" />
              </TouchableOpacity>
            </View>
          </BlockTitle>
          <ProgressCircle
            style={{
              height: 250,
              top: "10%",
              width: "80%",
              alignSelf: "center",
            }}
            progress={oxiPer / 100}
            progressColor={colors.text}
            backgroundColor={colors.white}
            strokeWidth={30}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
          >
            {/* <Text style={{ position: "absolute", left: "50%", top: 80 }}>
              SPO2
            </Text> */}
            <TopTextContainer>
              <TopTextRow>
                <TopTextNumber>{oxiPer}</TopTextNumber>
                <TopText>%</TopText>
              </TopTextRow>
            </TopTextContainer>
          </ProgressCircle>
        </View>
      </BlockContainer>
    </PanelContentContainer>
  );
};
export default OximConnect;
