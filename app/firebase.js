
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCK_JMPJ58tb2xrVunjPTYuk8QH1dTsPSs",
  authDomain: "learning-f4aba.firebaseapp.com",
  projectId: "learning-f4aba",
  storageBucket: "learning-f4aba.appspot.com",
  messagingSenderId: "461965907872",
  appId: "1:461965907872:web:6a525334387b2b98c5f6c5",
  measurementId: "G-BVH6P9259T"
};




export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage=getStorage();
export const db = getFirestore(app);