
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpwZ9wh2NvussQvwUZKfbgzaGW-xzclWE",
  authDomain: "react-projects-14a98.firebaseapp.com",
  projectId: "react-projects-14a98",
  storageBucket: "react-projects-14a98.firebasestorage.app",
  messagingSenderId: "50204158003",
  appId: "1:50204158003:web:cd57ce99e430ecbe845b46",
  measurementId: "G-7SFW5GSRVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
