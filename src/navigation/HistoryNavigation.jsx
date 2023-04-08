import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import History from "../screens/History";
import { HistoryItem } from "../screens/HistoryItem";

const HistoryNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryItem" component={HistoryItem} />
    </Stack.Navigator>
  );
};
export default HistoryNavigation;
