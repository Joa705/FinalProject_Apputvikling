// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHs9H29yiTqFLuRmoVF8_0ofCJFvLeSN8",
  authDomain: "finalproject-48758.firebaseapp.com",
  projectId: "finalproject-48758",
  storageBucket: "finalproject-48758.appspot.com",
  messagingSenderId: "719745458285",
  appId: "1:719745458285:web:cc6b53448b71ead69ddf64",
  measurementId: "G-6YESNWLMT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const authentication = getAuth(app); //refrences to auth
export default db;
