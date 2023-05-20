// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "shijiou-rmmps-is-5da78.firebaseapp.com",
    projectId: "shijiou-rmmps-is-5da78",
    storageBucket: "shijiou-rmmps-is-5da78.appspot.com",
    messagingSenderId: "657858379846",
    appId: "1:657858379846:web:0d2b37224ce52185edca47",
    measurementId: "G-W1BW1GS617"
};
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const ap = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };