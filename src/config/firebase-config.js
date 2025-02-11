// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMWIMNIJnC_0TOB6w-TExmskKfHA036H8",
  authDomain: "baqrq-al-sahab.firebaseapp.com",
  projectId: "baqrq-al-sahab",
  storageBucket: "baqrq-al-sahab.firebasestorage.app",
  messagingSenderId: "892518399307",
  appId: "1:892518399307:web:19c06fcd029a67035cfcce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;
