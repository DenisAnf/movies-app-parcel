export function createModel(movies) {
   return {
      movies,

      update: function (movies) {
         this.movies = movies;
      },

      create: function (name) {
         return { name: name, check: "unchecked" };
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
   };
}
