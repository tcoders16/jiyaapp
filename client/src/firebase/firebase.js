// Import the functions you need from the SDKs you need
// src/firebase/firebase.js

// Import core Firebase and services
import { initializeApp } from "firebase/app";
import { getFirestore, GeoPoint } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADS9SxEq3q9GL9oyhA_3uZFMu6TqTKupM",
  authDomain: "jiyapandya-b085f.firebaseapp.com",
  projectId: "jiyapandya-b085f",
  storageBucket: "jiyapandya-b085f.firebasestorage.app",
  messagingSenderId: "461273132912",
  appId: "1:461273132912:web:2b0413a1c55fafc12829b5",
  measurementId: "G-PYWMV9CDSB"
};


// Init Firebase core
const app = initializeApp(firebaseConfig);

// Init analytics (optional)
// const analytics = getAnalytics(app);

// Init services
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export these for use in your app
export { db, storage, GeoPoint };