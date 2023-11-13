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

let initialMovies = [];

const view = createView("#movies");
const model = createModel(initialMovies);
const storage = createStorage(STORAGE_LABEL_MOVIES);

const init = () => {
   const moviesFromStorage = storage.read();

   if (moviesFromStorage) {
      model.update(moviesFromStorage);
   }

   view.render(model.get());

   filmNameNode.focus();
};
init();

const validationFilmNameFromUser = () => {
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

const clearFilmNode = () => (filmNameNode.value = "");

const addMovieHandler = () => {
   if (validationFilmNameFromUser()) return;

   const movie = model.create(filmNameNode.value);

   model.add(movie);

   view.render(model.get());

   storage.push(model.get());

   clearFilmNode();
};

const addMovieByEnter = (event) => {
   if (event.keyCode === 13) {
      event.preventDefault();
      addMovieHandler();
      filmNameNode.focus();
   }
};

filmAddButton.addEventListener("click", addMovieHandler);
filmNameNode.addEventListener("keydown", addMovieByEnter);
