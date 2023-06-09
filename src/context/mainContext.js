import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [isRegistered, setRegister] = useState(false);
  const [device, setDevice] = useState("");
  const [dopDataArray, setDopDataArray] = useState([]);
  const [oxiDataArray, setOxiDataArray] = useState([]);
  const [user, setUser] = useState([]);
  const [userUpdated, setUserUpdated] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [heartBeat, setHeartBeat] = useState([]);
  const [oxiPer, setOxiPer] = useState([]);
  const [startTime, setStartTime] = useState();
  const [isAppLoading, setAppLoading] = useState(false);

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem("@User");
      const parsST = JSON.parse(getST);
      if (parsST?.length > 0) {
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
      if (parsST?.length > 0) {
        setDopDataArray(parsST);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@Alarms");
      const parsST = JSON.parse(getST);
      if (parsST?.length > 0) {
        setAlarms(parsST);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@Oxi");
      const parsST = JSON.parse(getST);
      if (parsST?.length > 0) {
        setOxiDataArray(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // AsyncStorage.clear();

  const saveNewUser = (userObject) => {
    console.log("new user:", userObject);
    userObject.status = "active";
    let userCopy = [...user];
    userCopy.map((item, index) => {
      if (item.status === "active") {
        userCopy[index].status = "noActive";
      }
    });
    userCopy.push(userObject);
    setUser(userCopy);
    saveUserToStorage(userCopy);
  };

  const updateUsers = (newArray) => {
    setUser(newArray);
    saveUserToStorage(newArray);
    setUserUpdated((per) => !per);
  };

  const saveUserToStorage = async (userArray) => {
    try {
      const stringified = await JSON.stringify(userArray);
      await AsyncStorage.setItem("@User", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  const saveDeviceToStorage = async (newDevice) => {
    try {
      const stringified = await JSON.stringify({ state: newDevice });
      await AsyncStorage.setItem("@Device", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  const saveSoundToStorage = async (sound) => {
    console.log("object to save in storage:", sound);
    const copyState = [sound, ...dopDataArray];
    setDopDataArray(copyState);
    try {
      const stringified = await JSON.stringify(copyState);
      await AsyncStorage.setItem("@Sound", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  const saveSoundDeletedToStorage = async (newArray) => {
    setDopDataArray(newArray);
    try {
      const stringified = await JSON.stringify(newArray);
      await AsyncStorage.setItem("@Sound", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  const saveNewAlarm = (newAlarm) => {
    const newArray = [newAlarm, ...alarms];
    setAlarms(newArray);
    saveAlarmToStorage(newArray);
  };
  const deleteAlarmHandler = (id) => {
    const newAlarm = [...alarms];
    const filtered = newAlarm.filter((item) => item.id !== id);
    setAlarms(filtered);
    saveAlarmToStorage(filtered);
  };
  const saveAlarmToStorage = async (newArray) => {
    try {
      const stringified = await JSON.stringify(newArray);
      await AsyncStorage.setItem("@Alarms", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewOxiItem = (newItem) => {
    setOxiDataArray([newItem, ...oxiDataArray]);
    saveOxiDataToStorage([newItem, ...oxiDataArray]);
  };
  const deleteOxiItemHandler = (newArray) => {
    setOxiDataArray(newArray);
    saveOxiDataToStorage(newArray);
  };

  const saveOxiDataToStorage = async (newArray) => {
    try {
      const stringified = await JSON.stringify(newArray);
      await AsyncStorage.setItem("@Oxi", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  const ctx = React.useMemo(
    () => ({
      user,
      isRegistered,
      device,
      dopDataArray,
      userUpdated,
      alarms,
      heartBeat,
      isAppLoading,
      oxiPer,
      startTime,
      oxiDataArray,
      deleteOxiItemHandler,
      saveNewOxiItem,
      setOxiPer,
      setStartTime,
      setAppLoading,
      setHeartBeat,
      saveNewAlarm,
      saveDeviceToStorage,
      saveSoundToStorage,
      setRegister,
      setDevice,
      saveNewUser,
      checkStorage,
      setDopDataArray,
      saveSoundDeletedToStorage,
      updateUsers,
      deleteAlarmHandler,
    }),
    [
      isRegistered,
      device,
      user,
      dopDataArray,
      userUpdated,
      alarms,
      heartBeat,
      isAppLoading,
      oxiPer,
      startTime,
      oxiDataArray,
    ]
  );
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
