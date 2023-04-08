import { View, Text, TouchableOpacity } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { XAxis, YAxis, LineChart, Grid } from "react-native-svg-charts";
import {
  BlockContainer,
  HistoryScreensContainer,
  ChartContainer,
} from "../styles";
import { FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../assets/utility/colors";

export const HistoryItem = ({ id, navigation }) => {
  const data = [
    { id: 1, date: "12 mayis 2022", average: 95, durationMill: 8756 },
    { id: 2, date: "14 mayis 2022", average: 92, durationMill: 8576 },
  ];
  const data2 = [80, 10, 95, 48, 24, 67, 51, 12, 65, 150, 24, 20, 50];

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

  return (
    <ScreenLayout
      header={
        <View
          style={{
            alignItems: "center",
            marginTop: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5
              name="arrow-alt-circle-left"
              size={34}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "500", color: colors.text }}>
            12:32 12 mayis 2023
          </Text>
        </View>
      }
    >
      <HistoryScreensContainer>
        <View
          style={{
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
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
          <BlockContainer>
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    paddingVertical: 15,
                    paddingHorizontal: 18,
                    borderRadius: 50,
                    borderColor: colors.text,
                  }}
                >
                  <FontAwesome5 name="play" size={24} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    justifyContent: "center",
                    borderColor: colors.text,
                    paddingHorizontal: 17,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome5 name="stop" size={24} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    justifyContent: "center",
                    borderColor: colors.text,
                    paddingHorizontal: 17,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome5
                    name="share-alt"
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    justifyContent: "center",
                    borderColor: colors.text,
                    paddingHorizontal: 17,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome5
                    name="trash-alt"
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 24, color: colors.text }}>00:00</Text>
              </View>
              <Slider
                style={{
                  height: 50,
                  width: "75%",
                  //   marginTop: "5%",
                }}
                step={1}
                thumbTintColor={colors.text}
                //   value={sliderValue / 1000}
                minimumValue={0}
                //   maximumValue={recordingTime / 1000}
                disabled={true}
                //   onValueChange={(value) => setSliderValue(value)}
                //   onSlidingComplete={(value) => handleSeek(value)}
              />
            </View>
          </BlockContainer>
        </View>
      </HistoryScreensContainer>
    </ScreenLayout>
  );
};
