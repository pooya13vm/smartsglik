import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { historyStringToArray } from "../assets/utility/historyStringToArray";
import {
  averageGroups,
  findMinMax,
  heartReportMaker,
  oxiReportMaker,
} from "../assets/utility/reportFunctions";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [isRegistered, setRegister] = useState(false);
  const [device, setDevice] = useState("");
  const [dopDataArray, setDopDataArray] = useState([]);
  const [user, setUser] = useState([]);
  const [userUpdated, setUserUpdated] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [heartBeat, setHeartBeat] = useState([]);
  const [oxiPer, setOxiPer] = useState([]);
  const [startTime, setStartTime] = useState();
  const [isAppLoading, setAppLoading] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [message, setMessage] = useState("");
  const [historyListArray, setHistoryListArray] = useState([]);
  const [isConnected, setConnected] = useState(false);

  const userIndex = user?.findIndex((item) => item.status === "active");
  // AsyncStorage.clear();
  //------------ +check Storage++ --------------
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
      const getST = await AsyncStorage.getItem("@Alarms");
      const parsST = JSON.parse(getST);
      if (parsST?.length > 0) {
        setAlarms(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //------------ ++device handlers++ --------------
  const saveDeviceToStorage = async (newDevice) => {
    try {
      const stringified = await JSON.stringify({ state: newDevice });
      await AsyncStorage.setItem("@Device", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  //------------ +++user handlers++ --------------
  const activeUserHandler = () => {
    const active = user.filter((u) => u.status === "active")[0];
    if (active.dopDataArray) {
      setDopDataArray([...active.dopDataArray]);
    } else {
      setDopDataArray([]);
    }
    setActiveUser({ ...active });
  };
  const saveNewUser = (userObject) => {
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
    activeUserHandler();
  };
  const saveUserToStorage = async (userArray) => {
    try {
      const stringified = await JSON.stringify(userArray);
      await AsyncStorage.setItem("@User", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  //------------ ++++alarm handlers++ --------------
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
  //------------ +++++dopp  handlers++ --------------
  const saveSoundToStorage = async (sound) => {
    if (activeUser.dopDataArray) {
      const newDataArray = [sound, ...activeUser.dopDataArray];
      activeUser.dopDataArray = newDataArray;
    } else {
      activeUser.dopDataArray = [sound];
    }
    const stateCopy = [...user];
    stateCopy[userIndex] = activeUser;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
    setDopDataArray([sound, ...dopDataArray]);
  };
  const saveSoundDeletedToStorage = async (newArray) => {
    const stateCopy = [...user];
    stateCopy[userIndex].dopDataArray = newArray;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
    setDopDataArray(newArray);
  };
  //------------ ++++++oxi handlers++ --------------
  const saveNewOxiItem = (newItem) => {
    console.log("new item to save 129", newItem);
    const stateCopyOne = { ...activeUser };
    if (activeUser.oxiDataArray) {
      const newDataArray = [newItem, ...activeUser.oxiDataArray];
      stateCopyOne.oxiDataArray = newDataArray;
    } else {
      stateCopyOne.oxiDataArray = [newItem];
    }
    const stateCopy = [...user];
    stateCopy[userIndex] = stateCopyOne;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
    setUserUpdated((per) => !per);
  };

  const deleteOxiItemHandler = (newArray) => {
    const stateCopy = [...user];
    stateCopy[userIndex].oxiDataArray = newArray;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
    setUserUpdated((per) => !per);
  };
  const saveHistoryItemToStorage = (itemObject) => {
    console.log("item in 175", itemObject);
    const dataString = historyStringToArray(itemObject.data);
    const oxiArray = dataString.oxi;
    const beatArray = dataString.beat;
    let oxiArrayCleared = oxiArray.filter(
      (index) => index >= 80 && index <= 100
    );
    let beatArrayCleared = beatArray.filter(
      (index) => index >= 55 && index <= 160
    );
    console.log("in context 209", dataString);
    const itemObj = {
      startTime: itemObject.id,
      stopTime: oxiArray.length * 8,
      heartArray: averageGroups(beatArrayCleared),
      oxiArray: averageGroups(oxiArrayCleared),
      heartMM: findMinMax(beatArrayCleared),
      oxiMM: findMinMax(oxiArrayCleared),
      heartReport: heartReportMaker(beatArrayCleared),
      oxiReport: oxiReportMaker(oxiArrayCleared),
      id: itemObject.id,
      timeDistance: "--",
    };
    const newItemInUser = { ...activeUser };
    if (!activeUser.oxiDataArray) {
      newItemInUser.oxiDataArray = [itemObj];
    } else {
      const isInData = activeUser.oxiDataArray.some(
        (item) => item.id === itemObj.id
      );
      if (!isInData) {
        newItemInUser.oxiDataArray.unshift(itemObj);
      }
    }
    const stateCopy = [...user];
    stateCopy[userIndex] = newItemInUser;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
    setUserUpdated((per) => !per);
  };
  //------------======== EKG handlers =====--------------
  const saveEKGNewItem = (newItem) => {
    console.log("new item to save 129", newItem);
    if (activeUser.EKGDataArray) {
      const newDataArray = [newItem, ...activeUser.EKGDataArray];
      activeUser.EKGDataArray = newDataArray;
    } else {
      activeUser.EKGDataArray = [newItem];
    }
    const stateCopy = [...user];
    stateCopy[userIndex] = activeUser;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
  };
  const deleteEKGItem = (item) => {
    const EKGArray = [...activeUser.EKGDataArray];
    // console.log("229:", EKGArray);
    const filtered = EKGArray.filter((val) => val.id !== item.id);
    // console.log("229:", filtered);
    const stateCopy = [...user];
    stateCopy[userIndex].EKGDataArray = filtered;
    setUser(stateCopy);
    saveUserChangesToStorage(stateCopy);
  };
  //------------ save Item to storage handlers++ --------------
  const saveUserChangesToStorage = async (newArray) => {
    try {
      const stringified = await JSON.stringify(newArray);
      await AsyncStorage.setItem("@User", stringified);
      setUserUpdated(!userUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const ctx = React.useMemo(
    () => ({
      user,
      activeUser,
      isRegistered,
      device,
      dopDataArray,
      userUpdated,
      alarms,
      heartBeat,
      isAppLoading,
      oxiPer,
      startTime,
      message,
      historyListArray,
      isConnected,
      setConnected,
      setHistoryListArray,
      setMessage,
      setActiveUser,
      activeUserHandler,
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
      saveHistoryItemToStorage,
      saveEKGNewItem,
      deleteEKGItem,
    }),
    [
      message,
      isConnected,
      isRegistered,
      device,
      user,
      activeUser,
      dopDataArray,
      userUpdated,
      alarms,
      heartBeat,
      isAppLoading,
      oxiPer,
      startTime,
      historyListArray,
    ]
  );
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
