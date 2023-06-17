import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBlgZvtHjkP_C2vW_jSgEecVRLz2BYyhE4",
  authDomain: "auth-development-d0cea.firebaseapp.com",
  projectId: "auth-development-d0cea",
  storageBucket: "auth-development-d0cea.appspot.com",
  messagingSenderId: "770603431055",
  appId: "1:770603431055:web:221a0e36579e902b7f2cfa",
  measurementId: "G-81SNHW870E"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
