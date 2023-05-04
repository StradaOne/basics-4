function getElement(selector){
    return document.querySelector(selector);
}

const form = getElement('.form');
const btn = getElement('.form__button');
const question = getElement('.question');

export {getElement, form, btn, question}