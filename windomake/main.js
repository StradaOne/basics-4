const BODY = {
  INPUT_FORM: document.getElementById('input-form'),
  SEARCH_BUTTON: document.getElementById('search-button'),
  OUTPUT: document.getElementById('output'),
};
const serverUrl = 'https://api.genderize.io';

function searchName(event) {
  event.preventDefault();
  const firstName = BODY.INPUT_FORM.value;
  fetch(`${serverUrl}?name=${firstName}`)
    .then((result) => result.json())
    .then((data) => {
      if (!data.gender) {
        BODY.OUTPUT.textContent = "Ooops... we're don't know this name.";
      } else {
        BODY.OUTPUT.textContent = `${firstName} is ${data.gender}`;
      }
    })
    .catch((err) => console.log(err));
}

BODY.INPUT_FORM.addEventListener('submit', searchName);
BODY.SEARCH_BUTTON.addEventListener('click', searchName);
