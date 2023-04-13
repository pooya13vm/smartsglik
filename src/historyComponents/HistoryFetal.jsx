import { useState, useContext, useEffect, useRef } from "react";
import {
  BlockContainer,
  ChartContainer,
  PanelContentContainer,
} from "../styles";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { XAxis, YAxis, LineChart, Grid } from "react-native-svg-charts";
import { AppContext } from "../context/mainContext";
import HistoryFetalList from "../components/HistoryFetalList";
import HistoryFetalItem from "../components/HistoryFetalItem";
import { colors } from "../assets/utility/colors";
import * as shape from "d3-shape";
import Share from "react-native-share";

export const HistoryFetal = () => {
  // states
  const [selectedItem, setSelectedItem] = useState(null);
  const [componentWidth, setComponentWidth] = useState(0);
  // context
  const { dopDataArray } = useContext(AppContext);

  const chartRef = useRef(null);
  // ----------------------- share sound ---------------------->
  const shareChart = async () => {
    const svgData = chartRef.current;
    console.log(svgData);
    // try {
    //   const options = {
    //     url: svgData,
    //     type: "image/svg+xml",
    //     message: "çocuk kalbimin kayıtlı sesi",
    //   };
    //   await Share.open(options);
    //   console.log("shared successfully");
    // } catch (error) {
    //   console.log("Error sharing sound:", error.message);
    // }
  };

  // const data2 = [];
  // useEffect(() => {
  //   dopDataArray.map((item) => {
  //     data2.push(item.average);
  //   });
  // }, []);
  const data2 = [80, 110, 95, 148, 124, 167, 151, 112, 165, 150, 124, 120, 150];

  return (
    <PanelContentContainer>
      <BlockContainer>
        <ChartContainer ref={chartRef}>
          <YAxis
            data={data2}
            contentInset={{ top: 20, bottom: 20 }}
            min={70}
            max={200}
            svg={{
              fill: "grey",
              fontSize: 11,
            }}
            style={{
              marginRight: 5,
              position: "absolute",
              height: "100%",
            }}
            formatLabel={(value) => `${value}`}
          />
          <LineChart
            style={{ height: 270, width: "86%", marginLeft: 32 }}
            gridMin={70}
            gridMax={200}
            data={data2}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 2,
              stroke: "green",
            }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
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
          <TouchableOpacity
            onPress={shareChart}
            style={{ position: "absolute", right: 15, top: 10 }}
          >
            <FontAwesome5 name="share-alt" size={22} color={colors.text} />
          </TouchableOpacity>
        </ChartContainer>
      </BlockContainer>
      {!selectedItem ? (
        <HistoryFetalList
          dopDataArray={dopDataArray}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <HistoryFetalItem
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}
    </PanelContentContainer>
  );
};
export default HistoryFetal;
