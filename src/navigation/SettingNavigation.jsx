import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Settings from "../screens/Settings";
import UsersList from "../screens/UsersList";
import ReminderList from "../screens/ReminderList";

const SettingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UsersList" component={UsersList} />
      <Stack.Screen name="ReminderList" component={ReminderList} />
    </Stack.Navigator>
  );
};
export default SettingNavigation;
