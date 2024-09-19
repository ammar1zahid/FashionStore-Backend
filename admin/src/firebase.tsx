// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK75TEA7EYjX1tMj0Zn4ue4t6Aa94KNx4",
  authDomain: "ecommerce-8e38e.firebaseapp.com",
  projectId: "ecommerce-8e38e",
  storageBucket: "ecommerce-8e38e.appspot.com",
  messagingSenderId: "557169141042",
  appId: "1:557169141042:web:7a85f0b7d9bedda493a32b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app