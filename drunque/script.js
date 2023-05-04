const form = document.querySelector("form");
const countryID = "RU";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = form.querySelector(`input[type="text"]`);
  const name = input.value;

  const serverUrl = "https://api.genderize.io";
  const url = `${serverUrl}?name=${name}&country_id=${countryID}`;

  fetch(url)
    .then((response) => response.json())
    .then(addResult)
    .then(() => (input.value = ""));
});

const history = document.querySelector(".history");
function addResult(info) {
  const result = document.createElement("div");

  if (info.count) {
    const name = document.createElement("p");
    name.textContent = `${info.name} is ${info.gender}.`;

    const popularity = document.createElement("p");
    popularity.textContent = `Popularity: ${info.count}`;

    result.append(name, popularity);
  } else {
    result.textContent = "Not found.";
  }

  result.classList.add("result");
  history.append(result);
}

function removeResult(event) {
  event.target.closest(".result").remove()
}

history.addEventListener("click", removeResult);
