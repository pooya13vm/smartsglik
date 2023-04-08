import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Switch,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { TitleText } from "../components/TitleText";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import HeaderWithText from "../components/HeaderWithText";
import { ListItemContainer } from "../styles";
import { DescriptionText } from "../components/DescriptionText";
import AddBtn from "../components/AddBtn";
import ModalContainer from "../components/ModalContainer";
import { SubmitBtn } from "../components/SubmitBtn";

const data = [
  { id: 1, name: "ilaç1", status: true },
  { id: 2, name: "ilaç2", status: false },
];

const ReminderList = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [list, setList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isActiveCheck, setActiveCheck] = useState(false);

  useEffect(() => {
    setList([...data]);
  }, []);

  const statusHandler = (id) => {
    const stateCopy = [...list];
    const index = stateCopy.findIndex((i) => i.id === id);
    stateCopy[index].status = !stateCopy[index].status;
    setList([...stateCopy]);
  };

  return (
    <ScreenLayout
      header={
        <HeaderWithText
          Icon={"notifications-circle-outline"}
          Title="Hatırlatma Listesi"
        />
      }
    >
      <View
        style={{
          width: (width * 85) / 100,
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <FlatList
          style={{ height: height - 280 }}
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ListItemContainer>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <DescriptionText size={22}>{item.name}</DescriptionText>

                  <Switch
                    value={item.status}
                    onValueChange={() => statusHandler(item.id)}
                  />
                </View>
              </ListItemContainer>
            );
          }}
        />
        <AddBtn icon="plus" onPress={() => setShowAddModal(true)} />
      </View>
      <ModalContainer
        heightPercentage={80}
        isModalVisible={showAddModal}
      ></ModalContainer>
    </ScreenLayout>
  );
};
export default ReminderList;
