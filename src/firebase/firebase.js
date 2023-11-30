import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY1VpWEUzhDQ722vFhmdEs3dgAegfCMFM",
  authDomain: "react-concerts-tickets.firebaseapp.com",
  projectId: "react-concerts-tickets",
  storageBucket: "react-concerts-tickets.appspot.com",
  messagingSenderId: "528904725076",
  appId: "1:528904725076:web:e3e28500a3997a038843c1",
  measurementId: "G-LHE1LQ862S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
