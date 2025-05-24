import { initializeApp, getApp , getApps } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyB37Kq5_FSGNZAEkSRHlggWlO2AqivhOVQ",
  authDomain: "prepwise-1668d.firebaseapp.com",
  projectId: "prepwise-1668d",
  storageBucket: "prepwise-1668d.firebasestorage.app",
  messagingSenderId: "838332642930",
  appId: "1:838332642930:web:df073f01cb33fdc8e5b4eb",
  measurementId: "G-XB5C5D49HH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);