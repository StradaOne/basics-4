
const formAddMessage = document.querySelector('.form');
const inputMessage = document.querySelector('.input_ms');
const content = document.querySelector('.content');
const allMessages = document.getElementsByClassName('message');
const lastElement = allMessages[allMessages.length - 1];
const tp = document.querySelector('#tp');

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

formAddMessage.addEventListener('submit', addMessage)

window.addEventListener('DOMContentLoaded', (event) => {
    content.scrollTop = content.scrollHeight;
})






