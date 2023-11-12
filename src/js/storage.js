const saveFilmsToLocalStorage = () => {
   const filmsString = JSON.stringify(films);
   localStorage.setItem(STORAGE_LABEL_MOVIES, filmsString);
};

const getFilmsFromLocalStorage = () => {
   const filmsFromLocalStorageString =
      localStorage.getItem(STORAGE_LABEL_MOVIES);
   const filmsFromLocalStorage = JSON.parse(filmsFromLocalStorageString);

   if (Array.isArray(filmsFromLocalStorage)) {
      films = filmsFromLocalStorage;
   }
};
