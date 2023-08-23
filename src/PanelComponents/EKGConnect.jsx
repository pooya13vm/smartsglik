import { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PanelContentContainer, BlockContainer } from "../styles";
import { rearrangedArray } from "../assets/utility/bluetoothConnection";
import { YAxis, LineChart, Grid } from "react-native-svg-charts";
import { colors } from "../assets/utility/colors";
import { ChartContainer } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../context/mainContext";
import uuid from "react-native-uuid";
import ModalContainer from "../components/ModalContainer";
import { DescriptionText } from "../components/DescriptionText";

const EKGConnect = ({ disconnectBluetooth }) => {
  const [dataArray, setDataArray] = useState([0]);
  const [chartArray, setChartArray] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { message, saveEKGNewItem } = useContext(AppContext);

  const resetChart = () => {
    const graph_size = 128;
    const array = new Array(graph_size);
    array.fill(0);
    setChartArray(array);
  };
  useEffect(() => {
    resetChart();
  }, []);

  useEffect(() => {
    if (message) {
      console.log("message in connect component:", message);
      if (message !== "0") {
        let newMessage = rearrangedArray(message);
        setDataArray([...dataArray, ...newMessage]);
        setChartArray([...newMessage]);
      } else {
        setChartArray([0, 0]);
        if (dataArray.length > 30) {
          setIsVisibleModal(true);
        }
      }
    }
  }, [message[0]]);
  const saveHandler = async () => {
    const itemObj = {
      time: new Date().toString(),
      data: dataArray,
      id: uuid.v4(),
    };
    await saveEKGNewItem(itemObj);
    await noSaveHandler();
  };
  const noSaveHandler = () => {
    setChartArray([]);
    disconnectBluetooth();
  };
  return (
    <PanelContentContainer>
      <BlockContainer>
        <ChartContainer>
          <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>
            <YAxis
              data={chartArray}
              contentInset={{ top: 20, bottom: 20 }}
              min={-100}
              max={1500}
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
              numberOfTicks={12}
            />
            <LineChart
              style={{
                height: "100%",
                width: "86%",
                marginLeft: 32,
              }}
              animate={true}
              yMin={-100}
              yMax={1500}
              gridMin={-100}
              gridMax={1400}
              data={chartArray}
              // curve={shape.curveNatural}
              svg={{
                strokeWidth: 2,
                stroke: "green",
              }}
              contentInset={{ top: 20, bottom: 20 }}
              numberOfTicks={12}
            >
              <Grid />
            </LineChart>
          </View>
        </ChartContainer>
      </BlockContainer>
      <TouchableOpacity
        style={{
          backgroundColor: colors.text,
          height: 50,
          borderRadius: 15,
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={disconnectBluetooth}
      >
        <Text style={{ color: "#fff", fontSize: 15 }}>
          Kaydet, Bluetooth Bağlantısını Kes
        </Text>
        <MaterialIcons name="bluetooth-disabled" size={24} color="#fff" />
      </TouchableOpacity>
      {/* ---------------modal--------- */}
      <ModalContainer isModalVisible={isVisibleModal} heightPercentage={50}>
        <MaterialIcons
          name="report"
          size={75}
          color={colors.text}
          style={{ alignSelf: "center", marginBottom: 20 }}
        />
        <DescriptionText
          children={
            "Kaydetmek İstiyor musun ? Cevabınız ' Evet ' ise geçmiş kayıtlarda görünecek, Cevabınız ' Hayır ' ise bu kayıt silinecek."
          }
          size={21}
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            marginTop: "20%",
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: colors.text,
              borderWidth: 2.5,
              paddingVertical: 7,
              alignItems: "center",
              borderRadius: 10,
              width: "35%",
            }}
            onPress={noSaveHandler}
          >
            <Text
              style={{ color: colors.text, fontWeight: "500", fontSize: 16 }}
            >
              Hayır
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.text,
              paddingVertical: 7,
              alignItems: "center",
              borderRadius: 10,
              width: "35%",
            }}
            onPress={saveHandler}
          >
            <Text
              style={{ color: colors.white, fontWeight: "500", fontSize: 16 }}
            >
              Evet
            </Text>
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </PanelContentContainer>
  );
};
export default EKGConnect;
