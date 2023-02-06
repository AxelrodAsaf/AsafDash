import {
    getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWYm1wGpzFlLOZCtRT0nTTF6iWBc7Fs9U",
    authDomain: "asafdashboard.firebaseapp.com",
    projectId: "asafdashboard",
    storageBucket: "asafdashboard.appspot.com",
    messagingSenderId: "558200744429",
    appId: "1:558200744429:web:19f556c6d3af2f608d1fe4",
    measurementId: "G-11FD8TNPJS"
};

const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
