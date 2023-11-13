export function createStorage(key) {
   return {
      key,

      read: function () {
         const dataString = localStorage.getItem(this.key);

         if (!dataString) {
            return null;
         }

         const data = JSON.parse(dataString);

         if (Array.isArray(data)) {
            return data;
         } else {
            return null;
         }
      },

      push: function (element) {
         const preparedElement = JSON.stringify(element);

         localStorage.setItem(this.key, preparedElement);
      },
   };
}
