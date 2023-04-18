import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppContext } from "../context/mainContext";
import RNDateTimePicker from "@react-native-community/datetimepicker";
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
import PushNotification, { Importance } from "react-native-push-notification";
import uuid from "react-native-uuid";

const ReminderList = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const { alarms, saveNewAlarm, deleteAlarmHandler } = useContext(AppContext);

  // const [list, setList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  // const [isActiveCheck, setActiveCheck] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [selectedTime, setSelectedTime] = useState();
  const [time, setTime] = useState();
  const [alarmMessage, setAlarmMessage] = useState("");

  useEffect(() => {
    createChannels();
    // PushNotification.configure({
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    // });
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: "alarm-channel",
      channelName: "Alarm Channel",
      importance: Importance.HIGH,
      playSound: true,
    });
  };
  const handleNotification = () => {
    console.log("time in notification handler:", time);
    const itemId = uuid.v4();
    PushNotification.localNotificationSchedule({
      channelId: "alarm-channel",
      title: "Smart Sağlık",
      message: alarmMessage ? alarmMessage : "Tanımsız",
      date: time,
      invokeApp: true,
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
      repeatType: "day",
      color: colors.lightBlue,
      id: itemId,
      ignoreInForeground: false,
    });
    const alarmObj = {
      id: itemId,
      time: time,
      message: alarmMessage ? alarmMessage : "Tanımsız",
    };
    saveNewAlarm(alarmObj);
    setShowAddModal(false);
  };

  const datePickerHandler = (event, time) => {
    if (event.type === "set") {
      setTime(time);
      console.log("date picker finished");
      setShowDatePicker(false);
      setShowAddModal(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const deleteHandler = (id) => {
    deleteAlarmHandler(id);
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
          data={alarms}
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
                  {item.message && (
                    <>
                      <DescriptionText size={22}>
                        {item.message}
                      </DescriptionText>
                      <DescriptionText size={22}>
                        {typeof item.time == "string"
                          ? item.time.slice(11, 16)
                          : `${item.time.getHours()} : ${item.time.getMinutes()}`}
                      </DescriptionText>
                    </>
                  )}
                  <TouchableOpacity onPress={() => deleteHandler(item.id)}>
                    <FontAwesome5 name="trash" size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </ListItemContainer>
            );
          }}
        />
        <AddBtn icon="plus" onPress={() => setShowDatePicker(true)} />
      </View>
      {showDatePicker && (
        <RNDateTimePicker
          mode="time"
          value={new Date()}
          onChange={datePickerHandler}
          themeVariant="light"
        />
      )}
      <ModalContainer heightPercentage={40} isModalVisible={showAddModal}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginRight: 10 }}>
            <FontAwesome5 name="bell" size={24} color={colors.text} />
          </View>
          <TitleText children={`${time?.getHours()} : ${time?.getMinutes()}`} />
        </View>

        <TextInput
          onChangeText={(val) => setAlarmMessage(val)}
          placeholder="Alarm Başlığı"
          maxLength={22}
          style={{
            marginHorizontal: 30,
            marginVertical: 60,
            fontSize: 18,
            color: colors.text,
            fontWeight: "600",
            borderBottomWidth: 2,
            paddingHorizontal: 7,
          }}
        />
        <SubmitBtn
          title={"Ayarla"}
          widthPercentage={56}
          onPressFun={handleNotification}
        />
        <TouchableOpacity
          onPress={() => {
            setAlarmMessage("");
            setShowAddModal(false);
            setTime({});
          }}
          style={{ position: "absolute", top: 15, right: 20 }}
        >
          <FontAwesome5 name="times" size={24} color={colors.text} />
        </TouchableOpacity>
      </ModalContainer>
    </ScreenLayout>
  );
};
export default ReminderList;
