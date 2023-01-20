// Import the functions you need from the SDKs you need
import {getStorage} from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {

  apiKey: "AIzaSyAJkSlN4oeNZprVSSUK5I8S8FdsOHz0jis",

  authDomain: "chat-1ec9a.firebaseapp.com",

  projectId: "chat-1ec9a",

  storageBucket: "chat-1ec9a.appspot.com",

  messagingSenderId: "166638192735",

  appId: "1:166638192735:web:30241473e8e0b9a35133ea"

};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore();
