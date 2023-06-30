
const btnLogin = document.querySelector('.button_exit');
const formAddMessage = document.querySelector('.form');
const inputMessage = document.querySelector('.input_ms');
const content = document.querySelector('.content');
const allMessages = document.getElementsByClassName('message');
const lastElement = allMessages[allMessages.length - 1];
const tp = document.querySelector('#tp');
const dialogAutoriz = document.querySelector('.dialog_autoriz');
const dialogConfirm = document.querySelector('.dialog_confirm');
const body = document.querySelector('body');
const dialogs = document.querySelectorAll('.dialog');
const forms = document.querySelectorAll('form');
// const buttonTextCode = document.querySelector('.button_text-code');
const buttons = document.querySelectorAll('.button');

function createHtmlElementMessage(userName, message, date, flag){

    if(isValid(message)){
        const blockMassage = tp.content.querySelector('.message');
        const user = tp.content.querySelector('.user');
        const text = tp.content.querySelector('.text');
        const time = tp.content.querySelector('.time');
    
        if(!flag){
            blockMassage.classList.add('message_my')
        }
    
        const dateNow = new Date();
        user.textContent = userName || 'I:';
        text.textContent = message;
        time.textContent = date || dateNow.getHours() + ' : ' + dateNow.getMinutes();
        
        const elementMessage = tp.content.cloneNode(true);
        content.append(elementMessage)

        content.scrollTop = content.scrollHeight;
    }
}

function isValid(message){
    if(message.length < 5){
        alert('You have to more letters')
        return false;
    }
    return true;
}

function addMessage(event){
    event.preventDefault()
    createHtmlElementMessage(null, inputMessage.value, null, null)
    event.target.reset()
}

function showDialog(){
    const flag = dialogAutoriz.classList.contains('dialog__show');
    if(!flag){
        dialogAutoriz.classList.add('dialog__show');
    } 
}

function closeDialog(event){
    if(event.target.classList.contains('dialog') 
        || event.target.classList.contains('dialog__btn')
    ) {
        for(const node of dialogs){
            node.classList.remove('dialog__show')
        }
    }   
}



formAddMessage.addEventListener('submit', addMessage)
btnLogin.addEventListener('click', showDialog)
body.addEventListener('click', closeDialog)

for(const button of buttons){
    if(button.classList.contains('button_text-code')){
            button.addEventListener("click", (event) => {
            for(const node of dialogs){
                node.classList.remove('dialog__show')
            }
            dialogConfirm.classList.add('dialog__show')
        })
    }
}

for(const form of forms){
    // if(form.classList.contains('addName')){
        
    // }
    if(form.classList.contains('autoriz')){
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            const formData = new FormData(form);
            const email = formData.get('inputEmail');
            const response = await fetch('https://edu.strada.one/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify({email})
            });
            event.target.reset()
        })
    }
    // if(form.classList.contains('confirm')){

    // }
}

window.addEventListener('DOMContentLoaded', (event) => {
    content.scrollTop = content.scrollHeight;
})







