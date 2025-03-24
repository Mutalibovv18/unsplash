import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBYvEre9XVgWkEja1OEfw9m6zb8zZbsWGY",
  authDomain: "my-splash-348ca.firebaseapp.com",
  projectId: "my-splash-348ca",
  storageBucket: "my-splash-348ca.firebasestorage.app",
  messagingSenderId: "425891502482",
  appId: "1:425891502482:web:83f7420b3f0196ed4dc94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth()

