
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBxGTX4F_lRq39VjDyd4N8W6dUt9_f_-w",
  authDomain: "react-exam-99ecc.firebaseapp.com",
  projectId: "react-exam-99ecc",
  storageBucket: "react-exam-99ecc.firebasestorage.app",
  messagingSenderId: "210806931082",
  appId: "1:210806931082:web:5b67873436833af0bab773"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
