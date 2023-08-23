import { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import { TitleText } from "../components/TitleText";
import { colors } from "../assets/utility/colors";
import { AppContext } from "../context/mainContext";
import { makeTurkishDate } from "../assets/utility/makeTurkishDate";
import { AntDesign } from "@expo/vector-icons";
import FileViewer from "react-native-file-viewer";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import { SaveQuestionModal } from "../components/SaveQuestionModal";

const EmptyList = () => {
  return (
    <View>
      <TitleText children={"Herhangi Bir Veri Yok"} />
    </View>
  );
};

const HistoryEKG = () => {
  const [pdfPath, setPdfPath] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { activeUser, deleteEKGItem } = useContext(AppContext);
  useEffect(() => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Pdf creator needs External Storage Write Permission",
            message: "Pdf creator needs access to Storage data in your SD Card",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("permission taken");
        } else {
          alert("WRITE_EXTERNAL_STORAGE permission denied");
        }
      } catch (err) {
        alert("Write permission err", err);
        console.warn(err);
      }
    }
    requestExternalWritePermission();
  }, []);

  const generatePDF = async (item) => {
    const dataArray = item.data;
    const stringifyData = dataArray.toString();
    console.log("in 55:", dataArray);
    const dataPoints = stringifyData.split(",").map(Number);
    const maxValue = 1200;
    const xScale = (index) =>
      (index / (dataPoints.length - 1)) * dataArray.length;
    const yScale = (value) => 500 / 2 - (value / maxValue) * (500 / 2);
    let pathData = `M0,${yScale(dataPoints[0])}`;
    for (let i = 1; i < dataPoints.length; i++) {
      pathData += ` L${xScale(i)},${yScale(dataPoints[i])}`;
    }

    const webViewContent = `
    <html>
    <head>
      <title>Dynamic Line Chart</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 0;
        }
        .chart-container {
          width: ${dataArray.length}px;
          margin: 50px auto;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
        }
        .chart {
          width: 100%;
          height: 850px;
          border: 1px solid #ccc;
          position: relative;
        }
        .line {
          fill: none;
          stroke: #007bff;
          stroke-width: 1;
        }
        .grid-line {
          stroke: #ccc;
          stroke-dasharray: 4 4;
        }
        .grid-label {
          font-size: 12px;
          fill: #333;
          text-anchor: end;
          alignment-baseline: middle;
        }
        .value-label {
          font-size: 12px;
          fill: #333;
          text-anchor: end;
          alignment-baseline: middle;
          transform: translate(-10px, 0);
        }
      </style>
    </head>
    <body>
      <div class="chart-container">
      <h1>SMART SAĞLIK</h1>
      <h3>Mobile EKG Ölçüm Sonuçları</h3>
      <h3>Kullanıcı Adı: ${activeUser.name}</h3>
      <h3>Tarih:${makeTurkishDate(item.time)}</h3>
        <div class="chart">
          <svg id="lineChart" width="100%" height="100%">
           
            <line class="grid-line" x1="0" x2="0" y1="0" y2="500"></line>
            <line class="grid-line" x1="25%" x2="25%" y1="0" y2="500"></line>
            <line class="grid-line" x1="50%" x2="50%" y1="0" y2="500"></line>
            <line class="grid-line" x1="75%" x2="75%" y1="0" y2="500"></line>
            <line class="grid-line" x1="100%" x2="100%" y1="0" y2="500"></line>
  
            <line class="grid-line" x1="0" x2="100%" y1="0" y2="0"></line>
            <line class="grid-line" x1="0" x2="100%" y1="125" y2="125"></line>
            <line class="grid-line" x1="0" x2="100%" y1="250" y2="250"></line>
            <line class="grid-line" x1="0" x2="100%" y1="375" y2="375"></line>
            <line class="grid-line" x1="0" x2="100%" y1="500" y2="500"></line>
            <line class="grid-line" x1="0" x2="100%" y1="62.5" y2="62.5"></line>
            <line class="grid-line" x1="0" x2="100%" y1="187.5" y2="187.5"></line>
            <line class="grid-line" x1="0" x2="100%" y1="312.5" y2="312.5"></line>
  
            <path d="${pathData}" class="line"></path>
          </svg>
        </div>
      </div>
    </body>
  </html>
      `;

    const options = {
      html: webViewContent,
      fileName: "chart",
      directory: "Downloads",
      base64: true,
      height: 1200,
      width: dataArray.length,
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setPdfPath(file.filePath);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const openFile = async (item) => {
    try {
      await generatePDF(item);
      await FileViewer.open(pdfPath);
    } catch (error) {
      console.log(error);
    }
  };
  const shareItem = async (item) => {
    try {
      await generatePDF(item);
      if (pdfPath) {
        const shareOptions = {
          title: "Share PDF",
          url: `file://${pdfPath}`,
          type: "application/pdf",
        };
        await Share.open(shareOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FlatList
        data={activeUser.EKGDataArray}
        ListEmptyComponent={EmptyList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          marginTop: 35,
          marginHorizontal: 20,
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.white,
                marginVertical: 15,
                borderRadius: 15,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.midBlue,
                  padding: 15,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                }}
                onPress={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
              >
                <AntDesign name="delete" size={24} color={colors.white} />
              </TouchableOpacity>

              <TitleText children={makeTurkishDate(item.time)} size={16} />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.midBlue,
                    padding: 15,
                    borderRightWidth: 2,
                    borderRightColor: colors.white,
                  }}
                  onPress={() => shareItem(item)}
                >
                  <AntDesign name="sharealt" size={23} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.midBlue,
                    padding: 15,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                  onPress={() => openFile(item)}
                >
                  <AntDesign name="pdffile1" size={24} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <SaveQuestionModal
        showSaveModal={showModal}
        noSaveHandler={() => {
          setSelectedItem(undefined);
          setShowModal(false);
        }}
        saveHandler={() => {
          deleteEKGItem(selectedItem);
          setShowModal(false);
        }}
      />
    </>
  );
};
export default HistoryEKG;
