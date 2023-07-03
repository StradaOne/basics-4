import { date } from "./modules/convertationTime"
import { format } from "date-fns";
import { getCookie, setCookie } from "./modules/cookieAction";
import { postData, changeName, getData } from "./modules/apiAction";

//кнопка выйти 
const buttonOut = document.querySelector('.header__btn-in');

const parentNode = document.querySelector(".display");
const inputNode = document.querySelector(".form__input");
const formNode = document.querySelector(".form");
const template = document.querySelector("#template");

//authorization
const openCodeModal = document.querySelector('.authorization-btn-code');
const formForRequest = document.querySelector('.authorization-form__input');

//authentication
const authenticationButton = document.querySelector('.authentication-btn');


const settingForm = document.querySelector('.popup-form__input');

//смена имени
const openSettingsModal = document.querySelector('.header__btn-settings');

//COOKIE
const cookie = getCookie()
const cookieToken = cookie.token

export {cookieToken};

//история сообщений
async function getHistoryMessage(cookieToken) {
  const url = 'https://edu.strada.one/api/messages/';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookieToken}`,
      
    }
  })
  const data = await response.json()
  const arrayMessage = data.messages.reverse();
  console.log(data) 
  const nodeElement = arrayMessage.map((message) => {
    const date = new Date(message.createdAt) 
    const fixDate = format(date, 'HH:mm')
  
  parentNode.append(createNewMessage(message.user.name, message.text, fixDate))
  return message
  });
  console.log(nodeElement)
  
}

getHistoryMessage(cookieToken)



//reset input
// function inputClear() {
//   inputNode.value = ''
// }


function createNewMessage(nickname, text, timeMess) { 
  // if (inputNode.value != '') {
    const textElement = template.content.cloneNode(true);
    const nameMessage = textElement.querySelector(".message-nickname").textContent = nickname;
    textElement.querySelector(".message-date").textContent = timeMess; //date
    textElement.querySelector("p").textContent = text; //было inputNode.value

    if (nickname === nameMessage) {
      textElement.querySelector("div").classList.add('display-items__message');
      
    } else {
      textElement.querySelector("div").classList.add('me');
    }

    // parentNode.append(textElement);
  return textElement;
    // inputClear();
  // }
}

function addInfoMessage() {
  const textElem = document.createElement('p');
  textElem.textContent = 'Код отправлен на вашу почту ✅';
  const parentElem = document.querySelector('.authorization');
  textElem.classList.add('info-message');
  parentElem.append(textElem);
}

function showAuthenticationModal() {
  window.authentication.showModal();
  window.authorization.close();
}

formForRequest.addEventListener('submit', () => {
  postData();
  addInfoMessage()
  setTimeout(showAuthenticationModal, 1500)
});

formNode.addEventListener("submit", (event) => {
  event.preventDefault();
  createNewMessage('Me:', inputNode.value) //убрать инпут
});


openSettingsModal.addEventListener('click', () => {
  window.myDialog.showModal();

})

openCodeModal.addEventListener('click', () => {
  window.authentication.showModal();
  window.authorization.close();
  
})

authenticationButton.addEventListener('click', () => {
  getData(cookieToken)
  setCookie();
  window.authentication.close();
});

buttonOut.addEventListener('click', () => {
  window.authorization.showModal();
  //очищать куки 
  document.cookie = `token=${new Date(0)}`
  //сделать смену кнопки на "войти"
})

settingForm.addEventListener('submit', () => {
  changeName();
  window.myDialog.close();
})



window.addEventListener('DOMContentLoaded', () => {
  getData(cookieToken);
  
})
