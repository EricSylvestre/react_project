// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo5-9WKmwYLiQiSkbb1_4LqgYxb0_P2xk",
    authDomain: "messengerapp-71cd0.firebaseapp.com",
    projectId: "messengerapp-71cd0",
    storageBucket: "messengerapp-71cd0.appspot.com",
    messagingSenderId: "14441413533",
    appId: "1:14441413533:web:0d5b65872e105efc21cd74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

