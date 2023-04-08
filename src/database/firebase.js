import { firebase } from "@react-native-firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZzr6xrZhVP2A_AOVdeoNJABoDZ_D7suU",
  authDomain: "smart-saglik.firebaseapp.com",
  projectId: "smart-saglik",
  storageBucket: "smart-saglik.appspot.com",
  messagingSenderId: "39560378684",
  appId: "1:39560378684:web:365c076bea5a91b74f4639",
  measurementId: "G-6NKCBPJJT9",
  //   databaseURL: "https://smart-saglik-default-rtdb.firebaseio.com/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  console.log("error in firebase config");
}

export default firebase;
