
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB4OvK8fea_T995ys4DWPH0ACyJXaIZgSY",
  authDomain: "connect-react-7556c.firebaseapp.com",
  projectId: "connect-react-7556c",
  storageBucket: "connect-react-7556c.appspot.com",
  messagingSenderId: "244293204702",
  appId: "1:244293204702:web:2ed4757668689407d5204f",
  measurementId: "G-XY6XN9GNE4"
};




export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage=getStorage();
export const db = getFirestore(app);