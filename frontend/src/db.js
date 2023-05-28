// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhb2y0HsVqAeT88DAe-1PRBA0l3bLiVDs",
    authDomain: "shijiou-rmmps-is2.firebaseapp.com",
    projectId: "shijiou-rmmps-is2",
    storageBucket: "shijiou-rmmps-is2.appspot.com",
    messagingSenderId: "788110559735",
    appId: "1:788110559735:web:f9691a938cada11880c6f2",
    measurementId: "G-WH537RE2R8"
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };