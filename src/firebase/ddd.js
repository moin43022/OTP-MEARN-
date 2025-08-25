import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUothfSvs-RQs9MBDD8To_6LrAv9-BFpc", // same key
  authDomain: "opt-demo-f4a6c.firebaseapp.com",
  projectId: "opt-demo-f4a6c",
  storageBucket: "opt-demo-f4a6c.appspot.com",
  messagingSenderId: "1025832725911",
  appId: "1:1025832725911:web:5f6ee8c00fe6d0b950a8d2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(auth);
