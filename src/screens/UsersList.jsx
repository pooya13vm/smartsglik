import { useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
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
  { id: 1, name: "nur", email: "xxx@xx.com", status: true },
  { id: 2, name: "alisa", email: "yyy@xx.com", status: false },
];

const UsersList = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [selectedItem, setSelectedItem] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [isActiveCheck, setActiveCheck] = useState(false);

  const deleteHandler = () => {
    setShowEditModal(false);
  };
  const activeHandler = () => {
    setShowEditModal(false);
  };
  return (
    <ScreenLayout
      header={
        <HeaderWithText
          Icon={"md-people-circle-outline"}
          Title="Kullanıcı Listesi"
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
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ListItemContainer
                onPress={() => {
                  setSelectedItem(item.name);
                  setShowEditModal(true);
                  if (item.status) setActiveCheck(true);
                }}
              >
                <View>
                  <DescriptionText size={22}>{item.name}</DescriptionText>
                  <DescriptionText size={14}>{item.email}</DescriptionText>
                </View>
                <Text
                  style={{
                    color: colors.midBlue,
                    fontSize: 18,
                    fontWeight: "600",
                    alignSelf: "center",
                    marginLeft: "50%",
                  }}
                >
                  {item.status && "Aktif"}
                </Text>
              </ListItemContainer>
            );
          }}
        />
        <AddBtn
          icon="user-plus"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
      <ModalContainer heightPercentage={45} isModalVisible={showEditModal}>
        {isActiveCheck ? (
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <TitleText
              children={
                "kullanıcı durumu şu anda aktif, düzenlemek veya silmek için önce başka bir kullanıcıyı aktif hale getirmelisiniz"
              }
              size={22}
            />
            <SubmitBtn
              widthPercentage={50}
              title="Tamam"
              onPressFun={() => {
                setActiveCheck(false);
                setShowEditModal(false);
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <TitleText children={selectedItem} />
            <View
              style={{
                height: 112,
                justifyContent: "space-between",
              }}
            >
              <SubmitBtn
                title="Sil"
                widthPercentage={50}
                iconName="trash-alt"
                onPressFun={deleteHandler}
              />
              <SubmitBtn
                title="Aktif"
                widthPercentage={50}
                iconName="check-circle"
                onPressFun={activeHandler}
              />
            </View>
          </View>
        )}
      </ModalContainer>
    </ScreenLayout>
  );
};
export default UsersList;
