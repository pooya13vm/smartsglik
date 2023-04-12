import styled from "styled-components";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { colors } from "./assets/utility/colors";

export const PanelContentContainer = styled.View`
  margin: 0 30px;
  height: ${(height * 70) / 100}px;
  justify-content: space-between;
`;
export const SettingContentContainer = styled.View`
  margin: 30px 30px;
  height: ${(height * 65) / 100}px;
`;
export const SettingItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${colors.white};
  margin: 15px 0px;
  padding: 15px 20px;
  border-radius: 30px;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.8;
  shadow-radius: 12px;
  elevation: 14;
`;
export const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${colors.white};
  margin: 15px 0px;
  padding: 10px 20px;
  border-radius: 35px;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 1px 10px;
  shadow-opacity: 0.5;
  shadow-radius: 30px;
  elevation: 8;
`;
export const CarouselContainer = styled.View`
  align-self: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const BlockContainer = styled.View`
  width: 100%;
  height: ${(height * 34) / 100}px;
  background-color: ${colors.lightBlue};
  border-radius: 20px;
  align-self: center;
  shadow-color: #000;
  shadow-offset: 1px 10px;
  shadow-opacity: 0.5;
  shadow-radius: 30px;
  elevation: 8;
  position: relative;
`;
export const BlockTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px 0 20px;
`;
export const MainScreensContainer = styled.View`
  height: ${Math.floor(height - 160)}px;
  position: relative;
  justify-content: center;
`;
export const ChartContainer = styled.View`
  flex-direction: row;
  margin: 5px;
  position: relative;
`;
