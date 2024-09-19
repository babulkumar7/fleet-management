// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; //
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCc1SIeYlVXiEjWB-gitEJGAgnZm0xrPpk",
    authDomain: "fleet-management-9dd1f.firebaseapp.com",
    projectId: "fleet-management-9dd1f",
    storageBucket: "fleet-management-9dd1f.appspot.com",
    messagingSenderId: "545153357303",
    appId: "1:545153357303:web:b3b25562eea3719a61caf2",
    measurementId: "G-W5T03SEVR4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Ensure you're passing the app instance here
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage

export default app;