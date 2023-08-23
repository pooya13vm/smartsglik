import { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { historyStringToArray } from "../assets/utility/historyStringToArray";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import { colors } from "../assets/utility/colors";
import { Feather } from "@expo/vector-icons";

const ShareBtn = ({ item, dataArray, name }) => {
  const [pdfPath, setPdfPath] = useState(null);

  const target = dataArray.filter((ite) => ite.id === item);
  const dataString = historyStringToArray(target[0].data);
  const beat = dataString.beat;
  const beatString = beat.join("-");
  const oxi = dataString.oxi;
  const time = oxi.length * 8;
  const oxiString = oxi.join(" - ");
  console.log(beat);
  const shareHandler = async () => {
    await generatePDF();
    await sharePDF();
  };
  function formatDateTime(inputString) {
    const year = inputString.substr(0, 4);
    const month = inputString.substr(4, 2);
    const day = inputString.substr(6, 2);
    const hour = inputString.substr(8, 2);
    const minute = inputString.substr(10, 2);

    return `${year}/${month}/${day}  saat: ${hour}:${minute}`;
  }
  const generatePDF = async () => {
    const htmlContent = `<h1>SMART SAĞLIK</h1><h3>Oksimetre Ölçüm Sonuçları</h3><h3>Kullanıcı Adı: ${name}</h3><h3>Tarih:${formatDateTime(
      item
    )}</h3><h3>süresi :${Math.round(
      time / 60
    )} dakika</h3><h4>Not: Veriler 8 saniye ara ile kaydedilmiştir.</h4><p>Nabiz: ${beatString}</p><p>Oksijen Seviyesi: ${oxiString}</p>`;

    const options = {
      html: htmlContent,
      fileName: "generated-pdf",
      directory: "Documents",
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    setPdfPath(pdf.filePath);
  };

  const sharePDF = async () => {
    if (pdfPath) {
      const shareOptions = {
        title: "Share PDF",
        url: `file://${pdfPath}`,
        type: "application/pdf",
      };

      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.error("Error sharing PDF", error);
      }
    }
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.midBlue,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: "row",
      }}
      onPress={() => {
        shareHandler();
      }}
    >
      <Feather
        name={!item.saved ? "download" : "share"}
        size={18}
        color={colors.white}
      />
      <Text
        style={{
          color: colors.white,
          fontSize: 18,
          marginLeft: 5,
        }}
      >
        Paylaş
      </Text>
    </TouchableOpacity>
  );
};

export default ShareBtn;
