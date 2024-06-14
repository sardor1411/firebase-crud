import { Firestore, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBSh7AoUBcBsFhUJSGQnExzSiXK0HC0bRk",
  authDomain: "test-a00e1.firebaseapp.com",
  projectId: "test-a00e1",
  storageBucket: "test-a00e1.appspot.com",
  messagingSenderId: "541834212267",
  appId: "1:541834212267:web:ee81839aa805f3f11c98ee",
  measurementId: "G-0VFQE6JJDV"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};