// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "temporary-adeb6.firebaseapp.com",
  projectId: "temporary-adeb6",
  storageBucket: "temporary-adeb6.firebasestorage.app",
  messagingSenderId: "735979718247",
  appId: "1:735979718247:web:c13a2f36d0b778bff0f6c2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
