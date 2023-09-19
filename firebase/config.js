import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAP8OVzBKN8_otENhL233pMIt7C1RLwRCc",
  authDomain: "react-native-first-2d94b.firebaseapp.com",
  databaseURL: "https://react-native-first-2d94b.firebaseio.com",
  projectId: "react-native-first-2d94b",
  storageBucket: "react-native-first-2d94b.appspot.com",
  messagingSenderId: "813171327070",
  appId: "1:813171327070:web:f0d2a63c922ea713aff4cf",
  measurementId: "G-ZJVCZ658J0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
