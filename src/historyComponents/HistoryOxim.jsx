import { useState, useContext, useEffect, useRef } from "react";
import { PanelContentContainer, ChartContainer } from "../styles";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/mainContext";
import { colors } from "../assets/utility/colors";
import { DescriptionText } from "../components/DescriptionText";
import { makeTurkishDate } from "../assets/utility/makeTurkishDate";
import styled from "styled-components";
import ModalContainer from "../components/ModalContainer";
import { XAxis, YAxis, LineChart, Grid } from "react-native-svg-charts";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Share from "react-native-share";
import ViewShot, { captureRef } from "react-native-view-shot";
import { WarningModal } from "../components/WarningModal";
import { TitleText } from "../components/TitleText";

const ItemTitleText = styled.Text`
  font-size: 14px;
  color: ${colors.darkBlue};
  font-weight: 500;
`;
const ItemDateText = styled.Text`
  font-size: 14px;
  color: ${colors.text};
  font-weight: 500;
`;
const ItemContainer = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${colors.white};
  shadow-color: #000;
  shadow-offset: {
    width: 0,
    height: 4,
  }
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  elevation: 8;
  width: 98%;
  align-self: center;
  height: 120px;
  border-radius: 20px;
  margin-bottom:20px;

`;
const ItemColum = styled.View`
  align-self: center;
  flex-direction: row;
`;
const ItemAverageText = styled.Text`
  font-size: 18px;
  color: ${colors.text};
  font-weight: 500;
`;

export const HistoryOxim = () => {
  // context
  const { oxiDataArray, deleteOxiItemHandler } = useContext(AppContext);

  // states
  const [isShowChartModal, setShowChartModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showWarningModal, setShowWarningModal] = useState(false);
  const chartRef = useRef(null);

  function getTimeInterval(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const timeInterval = Math.abs(date2 - date1);
    const minutes = Math.floor(timeInterval / 60000);
    const hours = Math.floor(minutes / 60);
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = (minutes % 60).toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }
  const selectedItemHandler = (id) => {
    const selected = oxiDataArray.filter((item) => item.id === id);
    setSelectedItem(selected[0]);
  };
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
  console.log(selectedItem);
  const deleteHandler = () => {
    const newArray = [];
    oxiDataArray.map((item) => {
      if (item.id !== selectedItem.id) {
        newArray.unshift(item);
      }
    });
    deleteOxiItemHandler(newArray);
    setShowChartModal(false);
    notDeleteHandler();
    setSelectedItem({});
  };
  const notDeleteHandler = () => {
    setShowWarningModal(false);
  };
  console.log(oxiDataArray);
  return (
    <PanelContentContainer>
      {oxiDataArray.length > 0 ? (
        <FlatList
          data={oxiDataArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ItemContainer
                onPress={() => {
                  selectedItemHandler(item.id);
                  setShowChartModal(true);
                }}
              >
                <ItemColum>
                  <ItemTitleText>Tarih: ​</ItemTitleText>
                  <ItemDateText>
                    {makeTurkishDate(item.startTime, false)}
                  </ItemDateText>
                  <ItemTitleText> {"     "}Sure: </ItemTitleText>
                  <ItemDateText>
                    {getTimeInterval(item.startTime, item.stopTime) === "00:00"
                      ? "Bir Dakikadan Az"
                      : getTimeInterval(item.startTime, item.stopTime)}
                  </ItemDateText>
                </ItemColum>
                <View
                  style={{
                    flexDirection: "row",
                    height: 80,
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      paddingHorizontal: 16,
                      paddingVertical: 15,
                      borderRadius: 50,
                      borderColor: "#F73059",
                    }}
                  >
                    <FontAwesome5 name="heartbeat" size={24} color="#F73059" />
                  </View>
                  <View>
                    <ItemTitleText>Ort.Nabız</ItemTitleText>
                    <ItemAverageText>
                      {Math.floor(
                        item.heartArray.reduce((a, b) => a + b, 0) /
                          item.heartArray.length
                      )}
                      <Text style={{ fontSize: 12 }}>BPM</Text>
                    </ItemAverageText>
                  </View>
                  <View
                    style={{
                      borderWidth: 2,
                      paddingHorizontal: 13,
                      paddingVertical: 12,
                      borderRadius: 50,
                      borderColor: "#8ca6b9",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="water-percent"
                      size={32}
                      color="#8ca6b9"
                    />
                  </View>
                  <View>
                    <ItemTitleText>Ort.Oksijen</ItemTitleText>
                    <ItemAverageText>
                      {Math.floor(
                        item.oxiArray.reduce((a, b) => a + b, 0) /
                          item.oxiArray.length
                      )}
                      <Text style={{ fontSize: 12 }}>%</Text>
                    </ItemAverageText>
                  </View>
                </View>
              </ItemContainer>
            );
          }}
        />
      ) : (
        <TitleText children={"Kayıt Bulunamadı"} />
      )}
      {selectedItem.id && (
        <ModalContainer
          heightPercentage={95}
          isModalVisible={isShowChartModal}
          animation="fade"
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowChartModal(false)}
              style={{
                borderWidth: 1,
                borderColor: colors.darkBlue,
                paddingHorizontal: 11,
                paddingVertical: 10,
                borderRadius: 30,
              }}
            >
              <AntDesign name="back" size={24} color={colors.darkBlue} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={shareChart}
              style={{
                borderWidth: 1,
                borderColor: colors.darkBlue,
                paddingHorizontal: 13,
                paddingVertical: 10,
                borderRadius: 30,
              }}
            >
              <FontAwesome5
                name="share-alt"
                size={24}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.darkBlue,
                paddingHorizontal: 13,
                paddingVertical: 10,
                borderRadius: 30,
              }}
              onPress={() => setShowWarningModal(true)}
            >
              <FontAwesome5
                name="trash-alt"
                size={24}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
          <ViewShot
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
            }}
            ref={chartRef}
          >
            <View
              style={{
                backgroundColor: colors.lightBlue,
                marginTop: 20,
                alignItems: "center",
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <ItemTitleText>
                Başlangıç: {makeTurkishDate(selectedItem.startTime, false)}
              </ItemTitleText>
              <ItemTitleText>
                Bitirme: {makeTurkishDate(selectedItem.stopTime, false)}
              </ItemTitleText>
              <ItemTitleText>
                Sure:{" "}
                {getTimeInterval(
                  selectedItem.startTime,
                  selectedItem.stopTime
                ) === "00:00"
                  ? "Bir Dakikadan Az"
                  : getTimeInterval(
                      selectedItem.startTime,
                      selectedItem.stopTime
                    )}
              </ItemTitleText>
              <ItemTitleText>
                Grafikteki Zaman Aralığı: {selectedItem.timeDistance}
              </ItemTitleText>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <DescriptionText children="Ort.Nabiz :" size={18} />
              <View style={{ flexDirection: "row" }}>
                <DescriptionText
                  size={18}
                  children={Math.floor(
                    selectedItem.heartArray.reduce((a, b) => a + b, 0) /
                      selectedItem.heartArray.length
                  )}
                />
                <Text
                  style={{
                    alignSelf: "flex-end",
                    fontSize: 12,
                    color: colors.text,
                  }}
                >
                  BPS
                </Text>
              </View>

              <FontAwesome5 name="heartbeat" size={22} color="#F73059" />
            </View>
            <ChartContainer>
              <YAxis
                data={selectedItem.heartArray}
                contentInset={{ top: 20, bottom: 20 }}
                min={50}
                max={220}
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
                numberOfTicks={10}
              />
              <LineChart
                style={{ height: "100%", width: "86%", marginLeft: 32 }}
                gridMin={50}
                gridMax={220}
                data={selectedItem.heartArray}
                // curve={shape.curveNatural}
                svg={{
                  strokeWidth: 2,
                  stroke: "green",
                }}
                numberOfTicks={22}
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
                data={selectedItem.heartArray}
                formatLabel={(value, index) => index}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: "gray" }}
              />
            </ChartContainer>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <DescriptionText children="Ort.Oksijen :" size={18} />
              <DescriptionText
                children={` ${Math.floor(
                  selectedItem.oxiArray.reduce((a, b) => a + b, 0) /
                    selectedItem.oxiArray.length
                )}%`}
                size={18}
              />
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#F73059",
                    fontWeight: "600",
                    fontSize: 21,
                  }}
                >
                  O
                </Text>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    fontSize: 14,
                    color: "#F73059",
                  }}
                >
                  2
                </Text>
              </View>
            </View>
            <ChartContainer>
              <View
                style={{ width: "100%", height: 200, position: "relative" }}
              >
                <YAxis
                  data={selectedItem.oxiArray}
                  contentInset={{ top: 20, bottom: 20 }}
                  min={50}
                  max={100}
                  svg={{
                    fill: "grey",
                    fontSize: 11,
                  }}
                  style={{
                    marginRight: 5,
                    position: "absolute",
                    height: 200,
                  }}
                  formatLabel={(value) => `${value}`}
                  numberOfTicks={10}
                />
                <LineChart
                  style={{ height: 200, width: "86%", marginLeft: 32 }}
                  gridMin={50}
                  gridMax={100}
                  data={selectedItem.oxiArray}
                  // curve={shape.curveNatural}
                  svg={{
                    strokeWidth: 2,
                    stroke: "green",
                  }}
                  height={100}
                  numberOfTicks={10}
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
                  data={selectedItem.oxiArray}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  svg={{ fontSize: 10, fill: "gray" }}
                />
              </View>
            </ChartContainer>
          </ViewShot>
        </ModalContainer>
      )}
      <WarningModal
        visibility={showWarningModal}
        setVisibility={setShowWarningModal}
        message="Bu Kaydı Silmek Istediğinizden Emin Misiniz?"
        result={true}
        resultFunction={deleteHandler}
        noFunction={notDeleteHandler}
      />
    </PanelContentContainer>
  );
};
export default HistoryOxim;
