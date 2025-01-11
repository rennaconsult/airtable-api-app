// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvPS0jCrjmPtT9UyN93EOh6yUYQI8oPUM",
  authDomain: "airtable-api-dashboard.firebaseapp.com",
  projectId: "airtable-api-dashboard",
  storageBucket: "airtable-api-dashboard.firebasestorage.app",
  messagingSenderId: "909545117549",
  appId: "1:909545117549:web:0f6b2d973dbe6fda28ec64",
  measurementId: "G-EC4MRHWQ1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
