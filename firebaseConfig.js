// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnHjVbs9i87DgodZrt4KxB0WNJzV5ExGM",
  authDomain: "reactnativeaula.firebaseapp.com",
  projectId: "reactnativeaula",
  storageBucket: "reactnativeaula.appspot.com",
  messagingSenderId: "702111079640",
  appId: "1:702111079640:web:e82869d318577ff9878bad",
  measurementId: "G-0TG6QC0NXV"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);