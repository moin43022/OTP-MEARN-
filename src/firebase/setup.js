// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUothfSvs-RQs9MBDD8To_6LrAv9-BFpc",
  authDomain: "opt-demo-f4a6c.firebaseapp.com",
  projectId: "opt-demo-f4a6c",
  storageBucket: "opt-demo-f4a6c.appspot.com",
  messagingSenderId: "1025832725911",
  appId: "1:1025832725911:web:5f6ee8c00fe6d0b950a8d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { RecaptchaVerifier };
