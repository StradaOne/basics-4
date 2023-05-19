const nameInput = document.querySelector(".input-name");
const form = document.querySelector(".form");
const output = document.querySelector(".output");

async function getResult() {
  const name = nameInput.value;

  if (!isNameEmrty(name)) {
    return
  }

  const serverUrl = "https://api.genderize.io";
  const url = `${serverUrl}?name=${name}`;
  let response = await fetch(url);
  let data = await response.json();
  const result = data.gender;

  output.textContent = `${name} is ${result}`;
}

function isNameEmrty(name) {
  if(!name) {
    alert('Введите имя');
  }

  return name;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getResult();
  nameInput.value = "";
});