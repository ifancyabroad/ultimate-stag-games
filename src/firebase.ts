// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDdKSMPSQI82VFrWug0BAhEOuk9Z32psQI",
	authDomain: "ultimate-stag-games.firebaseapp.com",
	projectId: "ultimate-stag-games",
	storageBucket: "ultimate-stag-games.firebasestorage.app",
	messagingSenderId: "191124046270",
	appId: "1:191124046270:web:10927bd4c0900543d6f9ef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
