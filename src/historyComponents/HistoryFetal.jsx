import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import { BlockContainer, ChartContainer } from "../styles";
import styled from "styled-components";
import { XAxis, YAxis, LineChart, Grid } from "react-native-svg-charts";
import { HistoryItem } from "../screens/HistoryItem";

export const AxisXLine = styled.View`
  height: 1px;
  width: 300px;
  position: absolute;
  left: 0;
  bottom: 22px;
  background-color: lightgrey;
`;
export const AxisYLine = styled.View`
  height: 243px;
  width: 1px;
  position: absolute;
  left: 42px;
  bottom: 32px;
  background-color: lightgrey;
`;

export const HistoryFetal = ({ navigation }) => {
  const [componentWidth, setComponentWidth] = useState(0);
  const data2 = [80, 10, 95, 48, 24, 67, 51, 12, 65, 150, 24, 20, 50];
  const data = [
    { id: 1, date: "12 mayis 2022", average: 95, durationMill: 8756 },
    { id: 2, date: "14 mayis 2022", average: 92, durationMill: 8576 },
  ];

  const createAverageValuesArray = (data) => {
    const averageValue = data.reduce((a, b) => a + b) / data.length;
    return Array(data.length).fill(averageValue);
  };
  const composeDataWithAverageValue = (valuesArray, averageValuesArray) => {
    return [
      {
        data: valuesArray,
        svg: { strokeWidth: 3 },
      },
      {
        data: averageValuesArray,
        svg: { strokeWidth: 1.5, strokeDasharray: [8, 16] },
      },
    ];
  };
  const averageValuesArray = createAverageValuesArray(data2);
  const dataWithAverageValue = composeDataWithAverageValue(
    data2,
    averageValuesArray
  );
  function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes} : ${seconds}`;
  }
  return (
    <View style={{ marginTop: 30 }}>
      <BlockContainer>
        <ChartContainer>
          <YAxis
            data={data2}
            contentInset={{ top: 20, bottom: 20 }}
            min={50}
            max={150}
            svg={{
              fill: "grey",
              fontSize: 11,
            }}
            style={{ marginRight: 5 }}
            formatLabel={(value) => `${value}`}
          />
          <LineChart
            style={{ height: 270 }}
            gridMin={50}
            gridMax={150}
            data={dataWithAverageValue}
            // curve={shape.curveNatural}
            svg={{
              stroke: "url(#gradient)",
            }}
            contentInset={{ top: 20, bottom: 20 }}
          ></LineChart>
          <XAxis
            style={{
              marginHorizontal: -10,
              marginTop: 10,
              position: "absolute",
              width: "90%",
              bottom: 0,

              marginLeft: 25,
            }}
            data={data2}
            formatLabel={(value, index) => index + 1}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: "black" }}
          />
        </ChartContainer>
      </BlockContainer>
      <FlatList
        style={{ marginTop: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
              width: "96%",
              alignSelf: "center",
              height: 70,
              borderRadius: 20,
              marginVertical: 12,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate(HistoryItem, { id: item.id })}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="calendar-alt" size={32} color={colors.text} />
              <View style={{ marginLeft: 5 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text,
                    fontWeight: "500",
                  }}
                >
                  {item.date}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text,
                    fontWeight: "500",
                  }}
                >
                  {formatTime(item.durationMill)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="heart" size={34} color="#F73059" />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text,
                    fontWeight: "500",
                  }}
                >
                  Nabiz
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.text,
                    fontWeight: "500",
                  }}
                >
                  {item.average} <Text style={{ fontSize: 12 }}>BPS</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default HistoryFetal;
