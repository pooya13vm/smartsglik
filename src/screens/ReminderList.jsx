import { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Alert,
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

const ReminderList = () => {
  const { width, height } = useWindowDimensions();
  const { alarms, saveNewAlarm, deleteAlarmHandler } = useContext(AppContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState();
  const [alarmMessage, setAlarmMessage] = useState("");
  const [timeObj, setTimeObj] = useState({ hour: 0, min: 0 });

  useEffect(() => {
    PushNotification.checkPermissions((res) => {
      if (!res.alert) {
        Alert.alert(
          "Bu bölümü kullanmak için bildirimleri kullanma izni verin"
        );
      }
    });

    createChannels();
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    });
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: "alarm-channel",
      channelName: "Alarm Channel",
      importance: Importance.HIGH,
      playSound: true,
      soundName: "android.resource://com.xyz/raw/sound1.wav",
      vibrate: true,
    });
  };
  function generateUniqueRandomNumber() {
    const ids = new Set(alarms.map((obj) => obj.id));
    let randomNum = Math.floor(Math.random() * 100) + 1;
    while (ids.has(randomNum)) {
      randomNum = Math.floor(Math.random() * 100) + 1;
    }
    return randomNum;
  }

  const handleNotification = () => {
    const UNId = generateUniqueRandomNumber();
    PushNotification.localNotificationSchedule({
      channelId: "alarm-channel",
      title: "Smart Sağlık",
      message: alarmMessage ? alarmMessage : "Tanımsız",
      bigText: `${timeObj.hour} : ${timeObj.min}`,
      date: time,
      invokeApp: true,
      allowWhileIdle: true,
      playSound: true,
      importance: Importance.HIGH,
      soundName: "sound1",
      repeatType: "day",
      color: colors.lightBlue,
      id: UNId,
      vibration: true,
      ignoreInForeground: false,
      repeatTime: 100,
    });
    const alarmObj = {
      id: UNId,
      time: timeObj,
      message: alarmMessage ? alarmMessage : "Tanımsız",
    };
    saveNewAlarm(alarmObj);
    setShowAddModal(false);
    setTimeObj({ hour: 0, min: 0 });
    setShowDatePicker(false);
  };

  const datePickerHandler = (event, time) => {
    if (event.type === "set") {
      setTime(time);
      const hour = time.getHours();
      const min = time.getMinutes();
      setTimeObj({ hour, min });
      setShowDatePicker(false);
      setShowAddModal(true);
    } else {
      setShowDatePicker(false);
    }
  };
  console.log(showDatePicker);

  const deleteHandler = (id) => {
    PushNotification.cancelLocalNotification(id);
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
                    alignItems: "center",
                  }}
                >
                  {item.message && (
                    <>
                      <View style={{ width: "45%", overflow: "hidden" }}>
                        <DescriptionText size={22}>
                          {item.message}
                        </DescriptionText>
                      </View>
                      <View style={{ width: "10%" }}>
                        <FontAwesome5
                          name="bell"
                          size={22}
                          color={colors.text}
                        />
                      </View>

                      <View style={{ width: "25%", alignItems: "center" }}>
                        <DescriptionText size={18}>
                          {item.time.hour} : {item.time.min}
                        </DescriptionText>
                      </View>
                    </>
                  )}
                  <TouchableOpacity
                    onPress={() => deleteHandler(item.id)}
                    style={{ width: "20%", alignItems: "flex-end" }}
                  >
                    <FontAwesome5 name="trash" size={22} color={colors.text} />
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
      <ModalContainer heightPercentage={50} isModalVisible={showAddModal}>
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
