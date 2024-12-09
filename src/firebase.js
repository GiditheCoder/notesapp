
import { initializeApp } from "firebase/app";
import  {getFirestore, collection}  from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyArf5fyuNyImQMrLlCt14UEMWV-w7qIT8Q",
  authDomain: "react-notes-3f435.firebaseapp.com",
  projectId: "react-notes-3f435",
  storageBucket: "react-notes-3f435.appspot.com",
  messagingSenderId: "420359059301",
  appId: "1:420359059301:web:443cbfc0c430c8fb96138c"
};


const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app)
export const notesCollection = collection(db, "notes")