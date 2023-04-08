import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [isRegistered, setRegister] = useState(false);
  const [device, setDevice] = useState("");
  const [dopDataArray, setDopDataArray] = useState([]);
  const [user, setUser] = useState({});

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem("@User");
      const parsST = JSON.parse(getST);
      if (parsST?.name) {
        setUser(parsST);
        setRegister(true);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@Device");
      const parsST = JSON.parse(getST);
      if (parsST?.state) {
        setDevice(parsST.state);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@Sound");
      const parsST = JSON.parse(getST);
      console.log("sound :", parsST);
      if (parsST?.id) {
        setDopDataArray(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // AsyncStorage.clear();

  const saveUserToStorage = async (userObject) => {
    setUser(userObject);
    try {
      const stringified = await JSON.stringify(userObject);
      console.log("stringified", stringified);
      await AsyncStorage.setItem("@User", stringified);
      console.log("saved ....");
    } catch (error) {
      console.log(error);
    }
  };
  const saveDeviceToStorage = async (device) => {
    try {
      const stringified = await JSON.stringify({ state: device });
      await AsyncStorage.setItem("@Device", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  const saveSoundToStorage = async (sound) => {
    const copyState = [sound, ...dopDataArray];
    setDopDataArray(copyState);
    console.log("is trying to save sound", copyState);
    try {
      const stringified = await JSON.stringify(copyState);
      await AsyncStorage.setItem("@Sound", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("dop data array is :", dopDataArray);
  const ctx = React.useMemo(
    () => ({
      user,
      isRegistered,
      device,
      saveDeviceToStorage,
      saveSoundToStorage,
      setRegister,
      setDevice,
      saveUserToStorage,
      checkStorage,
    }),
    [isRegistered, device, , user]
  );
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
