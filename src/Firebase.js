import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBhc9lNc7IIHddpOJT8cXcKLkrDFMPbfuA",
  authDomain: "todo-cdc2e.firebaseapp.com",
  projectId: "todo-cdc2e",
  storageBucket: "todo-cdc2e.appspot.com",
  messagingSenderId: "141243999665",
  appId: "1:141243999665:web:b4fd2673955f7bd3a48990",
  measurementId: "G-2QKDQ6D712",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db=getFirestore(app)