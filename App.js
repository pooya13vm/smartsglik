import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/mainContext";
import RegisterStackNavigation from "./src/navigation/mainNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RegisterStackNavigation />
      </AppProvider>
    </SafeAreaProvider>
  );
}
