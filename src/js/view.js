export function createView(elementId, onClickMovie, onClickDelete) {
   const outputNode = document.querySelector(elementId);

   return {
      outputNode,

      render: function (movies) {
         this.outputNode.innerHTML = "";

         movies.forEach((movie) => {
            this.add(movie);
         });
      },

      add: function (movie) {
         const li = document.createElement("li");
         const label = document.createElement("label");
         const checkbox = document.createElement("input");
         const fakeCheckbox = document.createElement("div");
         const title = document.createElement("span");
         const deleteBtn = document.createElement("button");

         li.className = "movies__list-item";
         label.className = "movie";
         checkbox.className = "movie__checkbox";
         fakeCheckbox.className = "movie__fakecheckbox";
         title.className = "movie__title";
         deleteBtn.className = "movie__deleteBtn";

         li.setAttribute("id", movie.id);
         checkbox.setAttribute("type", "checkbox");
         checkbox.setAttribute(movie.check, "");
         deleteBtn.setAttribute("type", "button");

         checkbox.onclick = () => {
            onClickMovie(movie.id);
         };

         deleteBtn.onclick = () => {
            onClickDelete(movie.id);
         };

         title.innerText = movie.name;

         li.appendChild(label);
         label.appendChild(checkbox);
         label.appendChild(fakeCheckbox);
         label.appendChild(title);
         label.appendChild(deleteBtn);

         this.outputNode.appendChild(li);
      },

      /*delete: function (id) {
         this.outputNode.removeChild();
      },*/
   };
}
