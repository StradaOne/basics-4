const parentNode = document.querySelector('.display');
const inputNode = document.querySelector('.form__input');
const formNode = document.querySelector('.form');
const template = document.querySelector('#template');

function createNewMessage() {
    const textElement = template.content.cloneNode(true);
    textElement.querySelector('.message-nickname').textContent = 'Me:';
    textElement.querySelector('.message-date').textContent = '18:45';
    textElement.querySelector('p').textContent = inputNode.value;
    parentNode.append(textElement);
    this.reset();
}


formNode.addEventListener('submit', createNewMessage);