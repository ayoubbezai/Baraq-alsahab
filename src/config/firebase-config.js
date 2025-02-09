// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqz6pmHC6UUpUHGx1jpqgeC--V5hy2QGY",
  authDomain: "barq-alsahab.firebaseapp.com",
  projectId: "barq-alsahab",
  storageBucket: "barq-alsahab.firebasestorage.app",
  messagingSenderId: "505074972727",
  appId: "1:505074972727:web:0327345ea43273134fe7b2",
  measurementId: "G-NGXKYFRGGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;
