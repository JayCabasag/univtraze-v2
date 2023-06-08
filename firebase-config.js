import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRXYLFz4y0DTHd32akxc2kITJiIimvEAQ",
  authDomain: "univtrazeapp.firebaseapp.com",
  projectId: "univtrazeapp",
  storageBucket: "univtrazeapp.appspot.com",
  messagingSenderId: "401898271128",
  appId: "1:401898271128:web:54b7960c232aaea5f6fbed",
  measurementId: "G-PMPEDQK1BC"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);
export const storage = getStorage(app);
