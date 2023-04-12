import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import SettingNavigation from "./SettingNavigation";
import Panel from "../screens/Panel";
import History from "../screens/History";
import { colors } from "../assets/utility/colors";

function TabsNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Panel"
      backBehavior="firstRoute"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderTopEndRadius: 25,
          borderTopStartRadius: 25,
          shadowColor: colors.darkBlue,
        },
      })}
    >
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.midBlue,
          tabBarItemStyle: { paddingVertical: 10 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarLabel: "Kayıtlar",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="history"
              color={focused ? colors.text : colors.midBlue}
              size={focused ? 28 : 23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Panel"
        component={Panel}
        options={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.midBlue,
          tabBarItemStyle: { paddingVertical: 10 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarLabel: "Panel",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="dashboard"
              color={focused ? colors.text : colors.midBlue}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingNavigation"
        component={SettingNavigation}
        options={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.midBlue,
          tabBarItemStyle: { paddingVertical: 10 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarLabel: "Ayarlar",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              color={focused ? colors.text : colors.midBlue}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default TabsNavigation;
