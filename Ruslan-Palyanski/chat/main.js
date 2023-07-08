
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
const dialogName = getElement('.dialog_name');
const dialogAutoriz = getElement('.dialog_autoriz');
const dialogConfirm = getElement('.dialog_confirm');
const dialogs = getNodeList('.dialog');
const forms = getNodeList('form');
const buttons = getNodeList('.button');

function render(){
    const historyMessage = storage.get('historyMessage');

    historyMessage.forEach(item => {
        return (
            createHtmlElementMessage(item.user.name, item.text, item.createdAt)
        )
    });

}
render()


function createHtmlElementMessage(userName, message, date, flag){

    if(isValid(message)){
        const blockMassage = tp.content.querySelector('.message');
        const user = tp.content.querySelector('.user');
        const text = tp.content.querySelector('.text');
        const time = tp.content.querySelector('.time');
    
        if(flag){
            blockMassage.classList.add('message_my')
        }
    
        const dateNow = new Date();
        user.textContent = userName || 'I';
        text.textContent = message;
        time.textContent = date || dateNow.getHours() + ' : ' + dateNow.getMinutes();
        
        const elementMessage = tp.content.cloneNode(true);

        content.append(elementMessage)

        content.scrollTop = content.scrollHeight;
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
    createHtmlElementMessage(name, inputMessage.value, null, true)
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
            const formData = new FormData(form);
            const name = formData.get('inputName');
            const token = cookie.getCookie('token');
            await fetch('https://edu.strada.one/api/user', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                  },        
                body: JSON.stringify({name})
            })
            form.reset()
            getNameFromServer()
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







