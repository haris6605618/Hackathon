// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUch5NWBYOyBnjyVsGEczMsUMpBWAtx7o",
  authDomain: "city-high-school-haris-ali.firebaseapp.com",
  projectId: "city-high-school-haris-ali",
  storageBucket: "city-high-school-haris-ali.appspot.com",
  messagingSenderId: "968995832067",
  appId: "1:968995832067:web:31256f2e99d011777d6936",
  measurementId: "G-7121W5KTC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);