import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLpI1_2vw5eEByzcvVIQcdMSAXx3nXiPs",
  authDomain: "freshgreen-401720.firebaseapp.com",
  projectId: "freshgreen-401720",
  storageBucket: "freshgreen-401720.appspot.com",
  messagingSenderId: "695374466102",
  appId: "1:695374466102:web:54daeb66e51eccdc0e9c97",
  measurementId: "G-3483C50L44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, firebaseConfig };
export default app;
