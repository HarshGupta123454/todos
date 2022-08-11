// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA9WJ5a-qAb_wph80eIZohxR3n-0IjiszU",
  authDomain: "todo-list-9c597.firebaseapp.com",
  databaseURL: "https://todo-list-9c597-default-rtdb.firebaseio.com",
  projectId: "todo-list-9c597",
  storageBucket: "todo-list-9c597.appspot.com",
  messagingSenderId: "228828250604",
  appId: "1:228828250604:web:9b7a03e51197116dd280c9",
  measurementId: "G-PF28W1V4MX"
};


const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);
 const auth = getAuth();

 export {auth , db}