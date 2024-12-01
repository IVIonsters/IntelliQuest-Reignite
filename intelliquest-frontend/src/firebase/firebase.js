/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBudVdPBK0rN59kY82HCpNMluFe7n3BRF0",
  authDomain: "intelliquest-login.firebaseapp.com",
  projectId: "intelliquest-login",
  storageBucket: "intelliquest-login.firebasestorage.app",
  messagingSenderId: "959850301815",
  appId: "1:959850301815:web:4f45fd35d9e65d2b4eb972",
  measurementId: "G-NY4Z1BS406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };