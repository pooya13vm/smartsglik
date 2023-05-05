import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "../context/mainContext";
const Stack = createNativeStackNavigator();

import TabsNavigation from "./TabNavigation";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/splashScreen/SplashScreen";
import { colors } from "../assets/utility/colors";

function RegisterStackNavigation() {
  const { isAppLoading } = useContext(AppContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.midBlue },
        }}
      >
        {!isAppLoading && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        <Stack.Screen name="Home" component={TabsNavigation} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RegisterStackNavigation;
