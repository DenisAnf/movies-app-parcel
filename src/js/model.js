import { v4 as uuidv4 } from "uuid";

export function createModel(moviesIds, moviesById) {
   return {
      moviesIds,
      moviesById,

      createMovie: function (name) {
         return { name: name, check: "unchecked", id: uuidv4() };
      },

      addMovie: function (movie) {
         this.moviesIds.push(movie.id);
         this.moviesById[movie.id] = movie;
      },

      setMovies: function (movies) {
         this.moviesIds = [];
         this.moviesById = {};

         movies.forEach((movie) => {
            this.moviesIds.push(movie.id);
            this.moviesById[movie.id] = movie;
         });
      },

      getMovies: function () {
         return {
            moviesIds: this.moviesIds,
            moviesById: this.moviesById,
         };
      },

      toggleCheckMovie: function (elementId) {
         if (this.moviesById[elementId].check === "unchecked") {
            this.moviesById[elementId].check = "checked";
         } else {
            this.moviesById[elementId].check = "unchecked";
         }
      },

      getMovie: function (elementId) {
         return this.moviesById[elementId];
      },

      deleteMovie: function (elementId) {
         delete this.moviesById[elementId];
         this.moviesIds.forEach((id, index) => {
            if (elementId === id) {
               this.moviesIds.splice(index, 1);
            }
         });
      },
   };
}
