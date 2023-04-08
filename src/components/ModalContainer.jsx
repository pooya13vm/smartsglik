import { Modal, View, useWindowDimensions } from "react-native";
import { colors } from "../assets/utility/colors";

const ModalContainer = ({
  children,
  heightPercentage,
  isModalVisible,
  animation = "slide",
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <Modal
      visible={isModalVisible}
      animationType={animation}
      transparent={true}
    >
      <View
        style={{
          backgroundColor: "rgba(202,216,222,0.8)",
          width: width,
          height: height,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: (width * 85) / 100,
            height: (height * heightPercentage) / 100,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
            borderRadius: 25,
            paddingVertical: 40,
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
export default ModalContainer;
