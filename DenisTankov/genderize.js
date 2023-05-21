const form = document.querySelector("#form");
const nameInput = document.querySelector("#nameInput");

form.addEventListener("submit", addUser);

function addUser(event) {
   event.preventDefault();
   const firstName = nameInput.value;
   const serverUrl = "https://api.genderize.io";
   const url = `${serverUrl}?name=${firstName}`;

   async function sendRequest(method, url) {
      return fetch(url).then((response) => {
         return response.json();
      });
   }

   sendRequest("POST", url)
      .then((user) => alert(`${user.name} is ${user.gender}`))
      .catch((err) => alert(err));
   nameInput.value = "";
   nameInput.focus();
}
