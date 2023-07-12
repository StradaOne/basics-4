function getUiElement(selector) {
  return document.querySelector(selector);
}

const UI_ELEMENTS = {
  FORM: getUiElement('.form'),
  INPUT: getUiElement('.form__input'),
  BUTTON: getUiElement('.form__btn'),
  OUTPUT: getUiElement('.form__output'),
};

function showResult(data) {
  UI_ELEMENTS.OUTPUT.textContent = `${data.name} is ${data.gender}`;
}

async function fetchData(event) {
  event.preventDefault();
  const serverUrl = 'https://api.genderize.io';
  const firstName = UI_ELEMENTS.INPUT.value;
  const url = `${serverUrl}?name=${firstName}`;
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    showResult(json);
  } else {
    alert('Произошла ошибка' + response.status);
  }
}

UI_ELEMENTS.FORM.addEventListener('submit', fetchData);
