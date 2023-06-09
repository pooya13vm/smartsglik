import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { colors } from "../assets/utility/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { makeTurkishDate } from "../assets/utility/makeTurkishDate";

const HistoryFetalList = ({ dopDataArray, setSelectedItem }) => {
  function formatTime(milliseconds) {
    if (!milliseconds) return "Ses Yok";
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes} : ${seconds}`;
  }

  return (
    <>
      {dopDataArray.length > 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={dopDataArray}
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
                width: "98%",
                alignSelf: "center",
                height: 70,
                borderRadius: 20,
                marginVertical: 12,
                alignItems: "center",
              }}
              onPress={() => setSelectedItem(item.id)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="calendar-alt"
                  size={32}
                  color={colors.text}
                />
                <View
                  style={{
                    marginLeft: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.text,
                        fontWeight: "500",
                      }}
                    >
                      {makeTurkishDate(item.date, false)}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.text,
                      fontWeight: "500",
                    }}
                  >
                    {formatTime(item.duration)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="heart" size={34} color="#F73059" />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.text,
                      fontWeight: "500",
                    }}
                  >
                    Ort.Nabız
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.text,
                      fontWeight: "500",
                    }}
                  >
                    {Math.floor(item.average)}
                    <Text style={{ fontSize: 12 }}>BPS</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

export default HistoryFetalList;
