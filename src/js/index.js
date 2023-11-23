import { createView } from "./view.js";
import { createModel } from "./model.js";
import { createStorage } from "./storage.js";
import {
   LIMIT_LENGTH_FILM_NAME,
   REG_SPACES_PUNСTUATION_MARKS,
   STORAGE_LABEL_MOVIES,
} from "./constants.js";

const filmNameNode = document.querySelector("#filmName");
const filmAddButton = document.querySelector("#filmAddButton");
const filmErrorNode = document.querySelector("#filmError");
const filmsOutputNode = document.querySelector("#movies");

let initialMovies = [];

const view = createView("#movies");
const model = createModel(initialMovies);
const storage = createStorage(STORAGE_LABEL_MOVIES);

const init = () => {
   storage.read().then((movies) => {
      model.update(movies);

      view.render(model.get());

      filmNameNode.focus();
   });
};
init();

const validation = () => {
   const filmFromUser = filmNameNode.value;
   const lengthFilmFromUser = filmFromUser.length;
   const filmFromUserWithoutSpace = filmFromUser.replace(
      REG_SPACES_PUNСTUATION_MARKS,
      ""
   );
   const lengthFilmFromUserWithoutSpace = filmFromUserWithoutSpace.length;

   if (!filmFromUser || lengthFilmFromUserWithoutSpace == 0) {
      filmErrorNode.textContent = "Введите правильно название фильма";
      filmNameNode.focus();
      return true;
   }

   if (lengthFilmFromUser > LIMIT_LENGTH_FILM_NAME) {
      filmErrorNode.textContent = `Не бывает фильмов длинее 130 символов (${lengthFilmFromUser}/${LIMIT_LENGTH_FILM_NAME})`;
      filmNameNode.focus();
      return true;
   }

   filmErrorNode.textContent = "";
   return false;
};

const addMovieHandler = () => {
   if (validation()) return;

   const movie = model.create(filmNameNode.value);

   model.add(movie);

   view.render(model.get());

   storage.push(movie);

   filmNameNode.value = "";
};

const addMovieByEnter = (event) => {
   if (event.keyCode === 13) {
      event.preventDefault();
      addMovieHandler();
      filmNameNode.focus();
   }
};

/*const checkMovie = (event) => {
   event.preventDefault();
   let idFilmItem;

   if (event.target.classList.contains("movies__list-item")) {
      idFilmItem = event.target.id;
   } else if (event.target.closest(".movies__list-item")) {
      idFilmItem = event.target.closest(".movies__list-item").id;
   }

   view.check(model.get()[idFilmItem]);

   view.render(model.get());

   storage.push(model.get());
};*/

const deleteMovie = (event) => {
   if (event.target.classList.contains("movie__deleteBtn")) {
      const idFilmItem = event.target.id;

      storage.delete(model.get()[idFilmItem]);

      model.deleteElement(idFilmItem);

      view.render(model.get());
   }
};

filmAddButton.addEventListener("click", addMovieHandler);
filmNameNode.addEventListener("keydown", addMovieByEnter);
//filmsOutputNode.addEventListener("click", checkMovie);
filmsOutputNode.addEventListener("click", deleteMovie);
