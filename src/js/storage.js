import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import {
   collection,
   doc,
   addDoc,
   getDocs,
   deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDqCOznEKySyzcjyIinAlNUbXT7iRDqsfc",
   authDomain: "movies-list-3e707.firebaseapp.com",
   projectId: "movies-list-3e707",
   storageBucket: "movies-list-3e707.appspot.com",
   messagingSenderId: "727948475586",
   appId: "1:727948475586:web:c3ddb36684753992f84f5b",
};

export function createStorage(key) {
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   return {
      key,
      db,

      read: async function () {
         const querySnapshot = await getDocs(collection(this.db, this.key));
         const movies = [];

         querySnapshot.forEach((doc) => {
            movies.push({
               id: doc.id,
               name: doc.data().name,
               check: doc.data().check,
            });
         });

         return movies;
      },

      push: async function (movie) {
         try {
            const docRef = await addDoc(collection(this.db, this.key), {
               name: movie.name,
               check: movie.check,
            });
            console.log("Document written with ID: ", docRef.id);
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      },

      delete: async function (movie) {
         await deleteDoc(doc(this.db, this.key, movie.id));
      },
   };
}
