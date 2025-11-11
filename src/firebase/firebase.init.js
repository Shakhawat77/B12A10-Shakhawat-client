// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvJZqiSO7t-5umJ1mWUbq7-vLcBVCSwOk",
  authDomain: "freelance-market-place-99e96.firebaseapp.com",
  projectId: "freelance-market-place-99e96",
  storageBucket: "freelance-market-place-99e96.firebasestorage.app",
  messagingSenderId: "124569634609",
  appId: "1:124569634609:web:861ed27e289c7fc7c45210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);