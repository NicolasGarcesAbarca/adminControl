// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.APIKEY,
  authDomain: "remind23451.firebaseapp.com",
  projectId: "remind23451",
  storageBucket: "remind23451.appspot.com",
  messagingSenderId: "503331096209",
  appId: "1:503331096209:web:6eed454f018a51ad0da130"
};
console.log("firebaseConfig", firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);