import { useState, useReducer, useContext } from "react";
import {
  View,
  useWindowDimensions,
  BackHandler,
  ScrollView,
  Keyboard,
} from "react-native";
// import firebase from "../database/firebase";
import { FormScreenBg } from "../components/FormScreenBg";
import { TitleText } from "../components/TitleText";
import { Input } from "../components/Input";
import LinkedText from "../components/LinkedText";
import Checkbox from "expo-checkbox";
import { colors } from "../assets/utility/colors";
import { SubmitBtn } from "../components/SubmitBtn";
import ModalContainer from "../components/ModalContainer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components";
import ButtonModal from "../components/ButtonModal";
import { WarningModal } from "../components/WarningModal";
import { AppContext } from "../context/mainContext";

const LinkTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
`;
const ButtonContainer = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
`;
const SendToSigInText = styled.Text`
  color: ${colors.text};
  font-weight: 500;
`;
const ModalTitle = styled.Text`
  color: ${colors.text};
  font-size: 17px;
  font-weight: 500;
`;
const ModalLinkPartContainer = styled.View`
  margin-top: 40%;
`;
const ModalLinkPartTitle = styled.Text`
  font-size: 16px;
  color: ${colors.text};
`;
const ModalButtonContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 15px;
  justify-content: space-between;
  margin-top: 40px;
`;
const ModalOutlineButton = styled.TouchableOpacity`
  border-color: ${colors.text};
  border-width: 2.5px;
  padding-vertical: 7px;
  align-items: center;
  border-radius: 10px;
  width: 35%;
`;
const ModalFilledButton = styled.TouchableOpacity`
  background-color: ${colors.text};
  padding-vertical: 7px;
  align-items: center;
  border-radius: 10px;
  width: 35%;
`;
const ModalFilledButtonText = styled.Text`
  color: ${colors.white};
  font-weight: 500;
`;
const ModalOutlineButtonText = styled.Text`
  color: ${colors.text};
  font-weight: 500;
`;

function SignUp({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonModalVisibility, setButtonModalVisibility] = useState(false);
  const [selectedSex, setSelectedSex] = useState("");
  const [warningModalVisibility, setWarningModalVisibility] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const INITIAL_STATE = {
    name: "",
    birthDay: "",
    sex: "",
    tall: "",
    weight: "",
    email: "",
    pass: "",
  };

  const registerReducer = (state, action) => {
    switch (action.type) {
      case "ADD_NAME":
        return {
          ...state,
          name: action.payload,
        };
      case "ADD_BIRTHDAY":
        return {
          ...state,
          birthDay: action.payload,
        };
      case "ADD_SEX":
        return {
          ...state,
          sex: action.payload,
        };
      case "ADD_HEIGHT":
        return {
          ...state,
          tall: action.payload,
        };
      case "ADD_WEIGHT":
        return {
          ...state,
          weight: action.payload,
        };
      case "ADD_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
      case "ADD_PASS":
        return {
          ...state,
          pass: action.payload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
  const { name, birthDay, sex, tall, weight, email, pass } = state;
  const { saveNewUser } = useContext(AppContext);

  const datePickerHandler = (event, selectedDate) => {
    if (event.type === "set") {
      let birthDayStr = `${selectedDate.getDate()} - ${
        selectedDate.getMonth() + 1
      } - ${selectedDate.getFullYear()}`;
      dispatch({ type: "ADD_BIRTHDAY", payload: birthDayStr });
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const sexModalCloseHandler = () => {
    dispatch({ type: "ADD_SEX", payload: selectedSex });
    setButtonModalVisibility(false);
  };

  const emailValidate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };
  const RegisterUserHandler = async () => {
    if (birthDay && email && name && pass && sex && tall && weight) {
      if (isChecked1 && isChecked2) {
        if (emailValidate(email)) {
          navigation.navigate("Home");
          saveNewUser(state);
        } else {
          setWarningMessage("Lütfen Geçerli Eposta Adresini Giriniz");
          setWarningModalVisibility(true);
        }
      } else {
        setWarningMessage(
          "Lütfen Gizlilik Politikası ve K.V.K.K. Onaylarını Veriniz"
        );
        setWarningModalVisibility(true);
      }
    } else {
      setWarningMessage("Lütfen Formdaki Tüm Maddeleri Doldurun");
      setWarningModalVisibility(true);
    }
  };

  return (
    <FormScreenBg>
      <View style={{ marginTop: (height * 2) / 100 }}>
        <TitleText>Kullanıcı Bilgileri</TitleText>
      </View>
      <ScrollView
        style={{
          marginVertical: (height * 2) / 100,
          maxHeight: (height * 60) / 100,
        }}
      >
        <Input
          placeholder="Isim ve Soyisim*"
          iconName="user"
          onChangeFun={(val) => dispatch({ type: "ADD_NAME", payload: val })}
        />
        <Input
          placeholder={birthDay ? birthDay : "Doğum Günü"}
          iconName="calendar"
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <RNDateTimePicker
            value={new Date()}
            onChange={datePickerHandler}
            themeVariant="light"
          />
        )}
        <Input
          placeholder={sex ? sex : "Cinsiyet"}
          iconName="intersex"
          onFocus={() => {
            if (Keyboard.isVisible()) Keyboard.dismiss();
            setButtonModalVisibility(true);
          }}
        />
        <Input
          placeholder="Boy (cm)"
          iconName="arrows-v"
          onChangeFun={(val) => dispatch({ type: "ADD_HEIGHT", payload: val })}
          keyboard="numeric"
        />
        <Input
          placeholder="Ağırlık (kg)"
          iconName="weight-hanging"
          isWeight={true}
          keyboard="numeric"
          onChangeFun={(val) => dispatch({ type: "ADD_WEIGHT", payload: val })}
        />
        <Input
          placeholder="Email*"
          iconName="envelope"
          onChangeFun={(val) => dispatch({ type: "ADD_EMAIL", payload: val })}
          keyboard="email-address"
        />
        <Input
          placeholder="Şifre*"
          iconName="lock"
          onChangeFun={(val) => dispatch({ type: "ADD_PASS", payload: val })}
          keyboard="visible-password"
        />
      </ScrollView>
      <View
        style={{
          width: (width * 75) / 100,
          alignSelf: "center",
        }}
      >
        <LinkTextContainer>
          <LinkedText
            url="https://www.sush.com.tr/gizlilik-politikasi"
            text="Gizlilik Politikası Ve Red Beyannamesi*"
          />
          <Checkbox
            value={isChecked1}
            onValueChange={setChecked1}
            color={colors.text}
          />
        </LinkTextContainer>
        <LinkTextContainer>
          <LinkedText
            url="https://www.sush.com.tr/k-v-k-k-hakkinda-aydinlatma-metni"
            text="K.V.K.K. Aydınlatma Metni*"
          />
          <Checkbox
            value={isChecked2}
            onValueChange={setChecked2}
            color={colors.text}
          />
        </LinkTextContainer>
      </View>
      <ButtonContainer>
        <SubmitBtn
          title="Kayıt Ol"
          onPressFun={() => {
            RegisterUserHandler();
          }}
        />
      </ButtonContainer>
      {/* <ButtonContainer onPress={() => navigation.navigate("SignIn")}>
        <SendToSigInText>Hesabın Var Mı ?</SendToSigInText>
      </ButtonContainer> */}
      {/* ----------------first modal---------- */}
      <ModalContainer heightPercentage={53} isModalVisible={isModalVisible}>
        <ModalTitle>
          * Smart Sağlık Marka Cihazlar İle Mobil Uygulamayı Kullanabilirsiniz.
        </ModalTitle>
        <ModalTitle>
          * Kişisel verileriniz sadece cihazınızda kalmaktadır.
        </ModalTitle>
        <ModalTitle>
          * Uygulamayı silmeniz durumunda verileriniz kalıcı olarak
          silinecektir.
        </ModalTitle>
        <ModalLinkPartContainer>
          <ModalLinkPartTitle>Satın Almak Için:</ModalLinkPartTitle>
          <LinkedText text="www.sush.com.tr" url="www.sush.com.tr" />
        </ModalLinkPartContainer>
        <ModalButtonContainer>
          <ModalOutlineButton onPress={() => BackHandler.exitApp()}>
            <ModalOutlineButtonText>Iptal</ModalOutlineButtonText>
          </ModalOutlineButton>
          <ModalFilledButton onPress={() => setModalVisible(false)}>
            <ModalFilledButtonText>Tamam</ModalFilledButtonText>
          </ModalFilledButton>
        </ModalButtonContainer>
      </ModalContainer>
      {/* ---------- button modal for choosing gender ------------- */}
      <ButtonModal
        isVisible={buttonModalVisibility}
        setSelectedSex={setSelectedSex}
        sexModalCloseHandler={sexModalCloseHandler}
      />
      <WarningModal
        visibility={warningModalVisibility}
        setVisibility={setWarningModalVisibility}
        message={warningMessage}
      />
    </FormScreenBg>
  );
}

export default SignUp;
