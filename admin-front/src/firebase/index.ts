// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA50hbJrKXYBk0mNQTNacBfFcIqJWGfAx0",
  authDomain: "remind23451.firebaseapp.com",
  projectId: "remind23451",
  storageBucket: "remind23451.appspot.com",
  messagingSenderId: "503331096209",
  appId: "1:503331096209:web:6eed454f018a51ad0da130"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);