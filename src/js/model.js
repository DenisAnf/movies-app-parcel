import { v4 as uuidv4 } from "uuid";

export function createModel(movies) {
   return {
      movies,

      update: function (movies) {
         this.movies = movies;
      },

      create: function (name) {
         return { name: name, check: "unchecked", id: uuidv4() };
      },

      add: function (movie) {
         this.movies.push(movie);
      },

      get: function () {
         return this.movies;
      },

      clear: function () {
         this.movies = [];
      },

      toggleCheckMovie: function (elementId) {
         this.get().forEach((movie) => {
            if (elementId !== movie.id) return;

            if (movie.check === "unchecked") {
               movie.check = "checked";
            } else {
               movie.check = "unchecked";
            }
         });
      },

      getMovie: function (elementId) {
         let result = null;

         this.get().forEach((movie) => {
            if (elementId == movie.id) {
               result = movie;
            }
         });

         return result;
      },

      deleteElement: function (elementId) {
         this.get().forEach((movie, index) => {
            if (elementId === movie.id) {
               this.movies.splice(index, 1);
            }
         });
      },
   };
}
