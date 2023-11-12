const filmNameNode = document.querySelector("#filmName");
const filmAddButton = document.querySelector("#filmAddButton");
const filmErrorNode = document.querySelector("#filmError");

const view = createView("#movies");

let films = [];

function Film(name) {
   this.name = name;
   this.check = "unchecked";
}

const getFilmFromUser = () => {
   const filmFromUser = filmNameNode.value;

   const film = new Film(filmFromUser);
   return film;
};

const addFilmToCatalog = (film) => films.push(film);

const getfilms = () => films;

const renderFilms = () => {};

const clearFilmNode = () => (filmNameNode.value = "");

const validationFilmNameFromUser = () => {
   const filmFromUser = filmNameNode.value;
   const lengthFilmFromUser = filmFromUser.length;
   const filmFromUserWithoutSpace = filmFromUser.replace(
      REG_SPACES_PUNСTUATION_MARKS,
      ""
   );
   const lengthFilmFromUserWithoutSpace = filmFromUserWithoutSpace.length;

   if (!filmFromUser || lengthFilmFromUserWithoutSpace == 0) {
      filmErrorNode.textContent = "Введите название фильма";
      clearFilmNode();
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
   if (validationFilmNameFromUser()) return;

   const movie = getFilmFromUser();

   addFilmToCatalog(movie);
   saveFilmsToLocalStorage();
   renderFilms();
   clearFilmNode();
};

const addMovieByEnter = (event) => {
   if (event.keyCode === 13) {
      event.preventDefault();
      addMovieHandler();
      filmNameNode.focus();
   }
};

const init = () => {
   getFilmsFromLocalStorage();
   view.render(films);

   filmNameNode.focus();
};
init();

filmAddButton.addEventListener("click", addMovieHandler);
filmNameNode.addEventListener("keydown", addMovieByEnter);
