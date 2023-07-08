import { storage } from "./modules/storage.js";
import { cookie } from "./modules/cookie.js";

function getElement(selector){
    return document.querySelector(selector);
}

function getNodeList(selector){
    return document.querySelectorAll(selector);
}

const formAddMessage = getElement('.form');
const inputMessage = getElement('.input_ms');
const content = getElement('.content');
const tp = getElement('#tp');
const wrapper = getElement('.wrapper ')
const dialogName = getElement('.dialog_name');
const dialogAutoriz = getElement('.dialog_autoriz');
const dialogConfirm = getElement('.dialog_confirm');
const notice = getElement('.notice');
const dialogs = getNodeList('.dialog');
const forms = getNodeList('form');
const buttons = getNodeList('.button');

// document.cookie = "token=token; max-age=0";
// localStorage.clear()

function render(){
    const historyMessage = storage.get('historyMessage');


    historyMessage.reverse().forEach(item => {
        createHtmlElementMessage(item.user.name, item.text, item.createdAt, item.user.email)
    });

}
render()

function createHtmlElementMessage(userName, message, date, flag){

    if(isValid(message)){
        const blockMassage = tp.content.querySelector('.message');
        const user = tp.content.querySelector('.user');
        const text = tp.content.querySelector('.text');
        const time = tp.content.querySelector('.time');
    
        if(flag === 'ruslapolyanski@yandex.ru'){
            blockMassage.classList.add('message_my')
        } else {
            blockMassage.classList.remove('message_my')
        }

            user.textContent = userName;
            text.textContent = message;
            time.textContent = date;
            
            const elementMessage = tp.content.cloneNode(true);
    
            content.append(elementMessage)

        content.scrollTop = content.scrollHeight

    }
}

function isValid(message){
    if(message.length < 0){
        alert('You have to more letters')
        return false;
    }
    return true;
}

function addMessage(event){
    event.preventDefault()
    const name = storage.get('name');
    socket.send(
        JSON.stringify({ text: inputMessage.value })
    );
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        const {text, createdAt , user: {name, email}} = data;
        createHtmlElementMessage(name, text, createdAt, email)
    };
    event.target.reset()
}

async function getNameFromServer(){
    const token = cookie.getCookie('token');
    const response = await fetch('https://edu.strada.one/api/user/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },   
    });
    const data = await response.json();
    storage.add('name', data.name)
}

for(const form of forms){
    if(form.classList.contains('addName')){
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            const token = cookie.getCookie('token');
            if(token){
                const formData = new FormData(form);
                const name = formData.get('inputName');
                await fetch('https://edu.strada.one/api/user', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                      },        
                    body: JSON.stringify({name})
                })
            } else {
                notice.textContent = 'You need to get token';
            }

            form.reset()
        })
    }
    if(form.classList.contains('autoriz')){
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            const formData = new FormData(form);
            const email = formData.get('inputEmail');
            await fetch('https://edu.strada.one/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify({email})
            });

            form.reset()
        })
    }
    if(form.classList.contains('confirm')){
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            const date = new Date(Date.now() +  604800e3);
            const formData = new FormData(form);
            const token = formData.get('inputToken');
            cookie.setCookie(token, date)
            event.target.reset()
        })
    }
}


let socket = null;
async function getWebSocket(){
    const token = cookie.getCookie('token');
    socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
    socket.onopen = function(){
        wrapper.classList.remove('wrapper-height')
        content.classList.remove('hide')
        formAddMessage.classList.remove('hide')
    }
}
getWebSocket()



async function getHistoryMessage(){
    const token = cookie.getCookie('token');
    const response = await fetch('https://edu.strada.one/api/messages/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    const data = await response.json();
    storage.add('historyMessage', data.messages)
}


function closeDialog(){
    for(const dialog of dialogs){
        dialog.classList.remove('dialog__show')
        notice.textContent = '';
    }
}

for(const dialog of dialogs){
    dialog.addEventListener('click', (event) => {
        if(event.target.classList.contains('dialog__btn')){
            closeDialog()
        }
        if(event.target.classList.contains('dialog')){
            closeDialog()
        }
    })
}

for(const button of buttons){
    if(button.classList.contains('button_settings')){
        button.addEventListener('click', () => {
            closeDialog()
            dialogName.classList.add('dialog__show')
        })
    }
    if(button.classList.contains('button_exit')){
        button.addEventListener('click', () => {
            closeDialog()
            dialogAutoriz.classList.add('dialog__show')
        })
    }
    if(button.classList.contains('button_text-code')){
        button.addEventListener('click', () => {
            closeDialog()
            dialogConfirm.classList.add('dialog__show')
        })
    }
}

formAddMessage.addEventListener('submit', addMessage)

window.addEventListener('DOMContentLoaded', () => {
    content.scrollTop = content.scrollHeight;
    getHistoryMessage()
})







