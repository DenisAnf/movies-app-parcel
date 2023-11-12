function createView(elementId) {
   //! ИСПРАВИТЬ СЛУШАТЕЛИ
   const outputNode = document.querySelector(elementId);

   return {
      outputNode,

      render: function (catalog) {
         this.outputNode.innerHTML = "";

         const catalogContainer = document.createElement("ul");
         catalogContainer.className = "movies__list";

         catalog.forEach((element, index) => {
            const catalogEl = document.createElement("li");
            const catalogElLabel = document.createElement("label");
            const catalogElCheckbox = document.createElement("input");
            const catalogElFakecheckbox = document.createElement("div");
            const catalogElTitle = document.createElement("span");
            const catalogElDeleteBtn = document.createElement("button");

            catalogEl.className = "movies__list-item";
            catalogElLabel.className = "movie";
            catalogElCheckbox.className = "movie__checkbox";
            catalogElFakecheckbox.className = "movie__fakecheckbox";
            catalogElTitle.className = "movie__title";
            catalogElDeleteBtn.className = "movie__deleteBtn";

            catalogEl.setAttribute("id", index);
            catalogElCheckbox.setAttribute("type", "checkbox");
            catalogElCheckbox.setAttribute(element.check, "");
            catalogElDeleteBtn.setAttribute("id", index);

            catalogElTitle.innerText = element.name;

            catalogEl.appendChild(catalogElLabel);
            catalogElLabel.appendChild(catalogElCheckbox);
            catalogElLabel.appendChild(catalogElFakecheckbox);
            catalogElLabel.appendChild(catalogElTitle);
            catalogElLabel.appendChild(catalogElDeleteBtn);

            catalogContainer.appendChild(catalogEl);

            catalogElCheckbox.addEventListener("click", () => {
               if (element.check === "unchecked") {
                  element.check = "checked";
               } else {
                  element.check = "unchecked";
               }
               saveFilmsToLocalStorage();
            });

            catalogElDeleteBtn.addEventListener("click", () => {
               films.splice(index, 1);
               saveFilmsToLocalStorage();
               renderFilms();
            });
         });

         this.outputNode.appendChild(catalogContainer);
      },
   };
}
