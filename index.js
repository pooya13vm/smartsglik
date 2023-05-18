import { registerRootComponent } from "expo";
import { Platform, AppRegistry } from "react-native";
import PushNotification from "react-native-push-notification";
import App from "./App";

PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === "ios",
});
// AppRegistry.registerHeadlessTask();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
// AppRegistry.registerComponent("main", () => SplashScreen);
