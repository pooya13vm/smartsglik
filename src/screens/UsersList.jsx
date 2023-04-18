import { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { colors } from "../assets/utility/colors";
import HeaderWithText from "../components/HeaderWithText";
import { ListItemContainer } from "../styles";
import { DescriptionText } from "../components/DescriptionText";
import AddBtn from "../components/AddBtn";
import ModalContainer from "../components/ModalContainer";
import { AppContext } from "../context/mainContext";
import styled from "styled-components";
import { TitleText } from "../components/TitleText";
import { SubmitBtn } from "../components/SubmitBtn";

const FontAwesomeContainer = styled.TouchableOpacity`
  border-width: 2px;
  padding-vertical: 16px;
  padding-horizontal: 22px;
  border-radius: 50px;
  border-color: ${colors.text};
  justify-content: center;
  align-items: center;
`;

const UsersList = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const { user, updateUsers } = useContext(AppContext);

  const [selectedIndex, setSelectedIndex] = useState(Number);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalV, setEditModalV] = useState(false);
  const [editedTall, setEditedTall] = useState(Number);
  const [editedWeight, setEditedWeight] = useState(Number);

  const deleteHandler = () => {
    const NewUsersArray = [...user];
    NewUsersArray.slice(selectedIndex, 1);
    updateUsers(NewUsersArray);
    setShowEditModal(false);
  };
  const activeHandler = () => {
    const NewUsersArray = [...user];
    NewUsersArray.map((item, index) => {
      if (item.status === "active") {
        NewUsersArray[index].status = "noActive";
      }
    });
    NewUsersArray[selectedIndex].status = "active";
    updateUsers(NewUsersArray);
    setShowEditModal(false);
  };
  const editHandler = () => {
    const NewUsersArray = [...user];
    if (editedTall > 0) {
      NewUsersArray[selectedIndex].tall = editedTall;
    }
    if (editedWeight > 0) {
      console.log(NewUsersArray[selectedIndex].weight);
      NewUsersArray[selectedIndex].weight = editedWeight;
    }
    updateUsers(NewUsersArray);
    setEditModalV(false);
  };
  return (
    <>
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
            width: (width * 90) / 100,
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <FlatList
            style={{ height: height - 280 }}
            data={user}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <ListItemContainer>
                  <View style={{ maxWidth: "50%" }}>
                    <DescriptionText size={22}>{item.name}</DescriptionText>
                    <DescriptionText size={14}>{item.email}</DescriptionText>
                  </View>
                  {item.status === "active" ? (
                    <>
                      <Text
                        style={{
                          color: colors.midBlue,
                          fontSize: 18,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                      >
                        Aktif
                      </Text>
                      <TouchableOpacity
                        style={{ alignSelf: "center" }}
                        onPress={() => {
                          setSelectedIndex(index);
                          setEditModalV(true);
                        }}
                      >
                        <FontAwesome5
                          name="user-edit"
                          size={24}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={{ alignSelf: "center" }}
                      onPress={() => {
                        setSelectedIndex(index);
                        setShowEditModal(true);
                      }}
                    >
                      <FontAwesome5
                        name="arrow-right"
                        size={24}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  )}
                </ListItemContainer>
              );
            }}
          />
          <AddBtn
            icon="user-plus"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </ScreenLayout>
      {/*-------- not active modal------------ */}
      <ModalContainer
        heightPercentage={25}
        isModalVisible={showEditModal}
        animation="fade"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <DescriptionText children={user[selectedIndex].name} />
          <TouchableOpacity
            style={{ marginTop: -20 }}
            onPress={() => setShowEditModal(false)}
          >
            <Ionicons
              name="close-circle-outline"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <FontAwesomeContainer onPress={deleteHandler}>
            <FontAwesome5 name="user-alt-slash" size={20} color={colors.text} />
            <TitleText children="Sil" size={12} />
          </FontAwesomeContainer>
          <FontAwesomeContainer
            onPress={() => {
              setEditModalV(true);
              setShowEditModal(false);
            }}
          >
            <FontAwesome5 name="user-edit" size={20} color={colors.text} />
            <TitleText children="Edit" size={12} />
          </FontAwesomeContainer>
          <FontAwesomeContainer onPress={activeHandler}>
            <FontAwesome5 name="user-check" size={20} color={colors.text} />
            <TitleText children="Aktif" size={12} />
          </FontAwesomeContainer>
        </View>
      </ModalContainer>
      {/*-------- edit modal------------ */}
      <ModalContainer heightPercentage={50} isModalVisible={editModalV}>
        <TitleText children={user[selectedIndex].name} />
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontSize: 24, marginBottom: 10, color: colors.text }}
            >
              Boy :
            </Text>
            <TextInput
              style={{
                width: "40%",
                borderBottomWidth: 2,
                borderBottomColor: colors.darkBlue,
                marginBottom: 20,
                paddingHorizontal: 10,
                fontSize: 24,
                marginLeft: "10%",
                color: colors.text,
              }}
              keyboardType="number-pad"
              placeholder={`${user[selectedIndex].tall} cm`}
              placeholderTextColor={colors.text}
              onChangeText={(val) => setEditedTall(val)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontSize: 24, marginBottom: 10, color: colors.text }}
            >
              Ayrılık :
            </Text>
            <TextInput
              style={{
                width: "40%",
                borderBottomWidth: 2,
                borderBottomColor: colors.darkBlue,
                marginBottom: 20,
                paddingHorizontal: 10,
                fontSize: 24,
                marginLeft: "10%",
                color: colors.text,
              }}
              keyboardType="number-pad"
              placeholder={`${user[selectedIndex].weight} kg`}
              placeholderTextColor={colors.text}
              onChangeText={(val) => setEditedWeight(val)}
            />
          </View>
        </View>
        <SubmitBtn
          widthPercentage={50}
          title="Tamam"
          onPressFun={editHandler}
        />
      </ModalContainer>
    </>
  );
};
export default UsersList;
