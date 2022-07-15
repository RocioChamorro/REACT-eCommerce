// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATsfxZEIKKH73g9OluQv7MxLqNZJkw8dk",
  authDomain: "react-ecommerce-29672.firebaseapp.com",
  projectId: "react-ecommerce-29672",
  storageBucket: "react-ecommerce-29672.appspot.com",
  messagingSenderId: "951165530560",
  appId: "1:951165530560:web:1a7b8997cfc35dac72d825",
  measurementId: "G-4B8YW2H5Q3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
