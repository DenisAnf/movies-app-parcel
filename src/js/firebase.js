import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDqCOznEKySyzcjyIinAlNUbXT7iRDqsfc",
   authDomain: "movies-list-3e707.firebaseapp.com",
   projectId: "movies-list-3e707",
   storageBucket: "movies-list-3e707.appspot.com",
   messagingSenderId: "727948475586",
   appId: "1:727948475586:web:c3ddb36684753992f84f5b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addFilmToFirestore() {
   try {
      const docRef = await addDoc(collection(db, "movies"), {
         checkbox: "false",
         title: "batman",
      });
      //console.log("Document written with ID: ", docRef.id);
   } catch (e) {
      //console.error("Error adding document: ", e);
   }
}

async function readFilmsFromFirestore() {
   const querySnapshot = await getDocs(collection(db, "movies"));
   querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data().title}`);
   });
   //console.log(querySnapshot);
}

readFilmsFromFirestore();

//console.log(app);
