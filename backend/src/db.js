// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBdMU3LuR9Tt_OVmQsYN8KDWhzGwxKJhVM",
  authDomain: "shijiou-rmmps-is3.firebaseapp.com",
  projectId: "shijiou-rmmps-is3",
  storageBucket: "shijiou-rmmps-is3.appspot.com",
  messagingSenderId: "914782855839",
  appId: "1:914782855839:web:78f7dfac169080cb2838aa",
  measurementId: "G-RY1X8DR5XV"
};
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };