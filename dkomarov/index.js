import { date } from "./modules/convTime"

const parentNode = document.querySelector(".display");
const inputNode = document.querySelector(".form__input");
const formNode = document.querySelector(".form");
const template = document.querySelector("#template");

const openSettingsModal = document.querySelector('.header__btn-settings');
const openCodeModal = document.querySelector('.authorization-btn-code');
const inputAuthorizationValue = document.querySelector('.authorization-input');
const formForRequest = document.querySelector('.authorization-form__input');

function createNewMessage(event) { 
  event.preventDefault();
  if (inputNode.value != "") {
    const textElement = template.content.cloneNode(true);
    textElement.querySelector(".message-nickname").textContent = "Me:";
    textElement.querySelector(".message-date").textContent = date;
    textElement.querySelector("p").textContent = inputNode.value;
    parentNode.append(textElement);
    this.reset();
  }
}

async function postData() {
  const url = 'https://edu.strada.one/api/user';
  const data = { email: inputAuthorizationValue.value };

  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  console.log(result);
}

function addInfoMessage() {
  const textElem = document.createElement('p');
  textElem.textContent = 'Код отправлен на вашу почту ✅';
  const parentElem = document.querySelector('.authorization');
  textElem.classList.add('info-message');
  parentElem.append(textElem);
}

function test() {
  window.authentication.showModal();
}

formForRequest.addEventListener('submit', () => {
  postData();
  addInfoMessage()
  setTimeout(test, 1500)
});

formNode.addEventListener("submit", createNewMessage);

openSettingsModal.addEventListener('click', () => {
  window.myDialog.showModal();
})

openCodeModal.addEventListener('click', () => {
  window.authentication.showModal();
  window.authorization.close();
  
})

window.addEventListener('DOMContentLoaded', () => {
  window.authorization.showModal();
})
