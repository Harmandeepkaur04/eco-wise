// Import the functions from the SDKs needed
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh13xrzygYO4mW6kp-w6LIVQLCER7SM0Q",
  authDomain: "ecowise-460dd.firebaseapp.com",
  projectId: "ecowise-460dd",
  storageBucket: "ecowise-460dd.appspot.com",
  messagingSenderId: "469551357235",
  appId: "1:469551357235:web:8d46085b5cb54f6ef1b246",
  measurementId: "G-KNYH31XZQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };