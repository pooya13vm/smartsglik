import { useState, useContext, useEffect } from "react";
import {
  BlockContainer,
  ChartContainer,
  PanelContentContainer,
} from "../styles";
import styled from "styled-components";
import { XAxis, YAxis, LineChart, Grid } from "react-native-svg-charts";
import { AppContext } from "../context/mainContext";
import HistoryFetalList from "../components/HistoryFetalList";
import HistoryFetalItem from "../components/HistoryFetalItem";

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

export const HistoryFetal = () => {
  // states
  const [selectedItem, setSelectedItem] = useState(null);
  const [componentWidth, setComponentWidth] = useState(0);
  // context
  const { dopDataArray } = useContext(AppContext);
  console.log(dopDataArray[0].average);
  // const data2 = [];
  // useEffect(() => {
  //   dopDataArray.map((item) => {
  //     data2.push(item.average);
  //   });
  // }, []);
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
    <PanelContentContainer>
      <BlockContainer>
        <ChartContainer>
          <YAxis
            data={data2}
            contentInset={{ top: 20, bottom: 20 }}
            min={70}
            max={200}
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
