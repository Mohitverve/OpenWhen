// src/firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBpUCSPGf6ACoUWuqs9mgdkcht5L_kBQGA",
    authDomain: "khushi-b6049.firebaseapp.com",
    projectId: "khushi-b6049",
    storageBucket: "khushi-b6049.appspot.com",
    messagingSenderId: "529051306762",
    appId: "1:529051306762:web:2449be2a8f9233bf64c8f3"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Set up Auth & Provider
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Firestore
export const db = getFirestore(app)
