import { initializeApp } from "firebase/app";
import {
   getFirestore,
   collection,
   doc,
   setDoc,
   getDocs,
   deleteDoc,
   writeBatch,
   serverTimestamp,
   query,
   orderBy,
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
         const ref = collection(this.db, this.key);
         const q = query(ref, orderBy("createdAt"));
         const querySnapshot = await getDocs(q);
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
            await setDoc(doc(this.db, this.key, movie.id), {
               name: movie.name,
               check: movie.check,
               createdAt: serverTimestamp(),
            });
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      },

      delete: async function (id) {
         await deleteDoc(doc(this.db, this.key, id));
      },

      update: async function (movie) {
         const batch = writeBatch(this.db);

         const sfRef = doc(this.db, this.key, movie.id);
         batch.update(sfRef, { check: movie.check });

         await batch.commit();
      },
   };
}
