import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqxSaKwhyd1RdsI4N03j_4l-D8FJRHhxw",
  authDomain: "react-native-d7a07.firebaseapp.com",
  databaseURL: "https://react-native-d7a07-default-rtdb.firebaseio.com",
  projectId: "react-native-d7a07",
  storageBucket: "react-native-d7a07.appspot.com",
  messagingSenderId: "150552392690",
  appId: "1:150552392690:web:0e4b9df07a82d010c8b16b",
  measurementId: "G-6RZY15LXTQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
console.log(database);
