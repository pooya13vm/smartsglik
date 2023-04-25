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
// import * as shape from "d3-shape";
import Share from "react-native-share";
import ViewShot, { captureRef } from "react-native-view-shot";
import { TitleText } from "../components/TitleText";

export const HistoryFetal = () => {
  // states
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [XData, setXData] = useState([]);
  // context
  const { dopDataArray } = useContext(AppContext);
  const chartRef = useRef(null);

  // ----------------------- share sound ---------------------->
  const shareChart = async () => {
    try {
      const uri = await captureRef(chartRef, {
        format: "png",
        quality: 0.7,
      });
      await Share.open({ url: uri, type: "image/png" });
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    let myArray = [];
    dopDataArray.map((item) => {
      myArray.unshift(item.average);
    });
    setData(myArray);
    let XArray = [];
    dopDataArray.map((item) => {
      XArray.unshift(item?.date.toString().slice(8, 10));
    });
    setXData(XArray);
  }, [dopDataArray.length]);

  return (
    <PanelContentContainer>
      {dopDataArray.length > 0 ? (
        <BlockContainer>
          <ChartContainer>
            <ViewShot
              style={{ flex: 1, backgroundColor: colors.lightBlue }}
              ref={chartRef}
            >
              <YAxis
                data={data}
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
                data={data}
                // curve={shape.curveNatural}
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
                data={data}
                formatLabel={(value, index) => XData[index]}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: "gray" }}
              />
            </ViewShot>
            <TouchableOpacity
              onPress={shareChart}
              style={{ position: "absolute", right: 15, top: 10 }}
            >
              <FontAwesome5 name="share-alt" size={22} color={colors.text} />
            </TouchableOpacity>
          </ChartContainer>
        </BlockContainer>
      ) : (
        <TitleText children={"Listede öğe yok"} />
      )}
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
