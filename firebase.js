// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7aj-1WK4msNkDOgjX4NGEe49YRM4ryeI",
  authDomain: "ecowise-e9fef.firebaseapp.com",
  projectId: "ecowise-e9fef",
  storageBucket: "ecowise-e9fef.appspot.com",
  messagingSenderId: "442321119770",
  appId: "1:442321119770:web:817c0a8e130e4327903fa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth};