function getElement(selector){
    const element = document.querySelector(selector);
    return element;
}

const high = getElement('.high');
const low = getElement('.low');
const formHigh = getElement('.form-high');
const formLow = getElement('.form-low');
const listItem = getElement('.todo');

export {getElement, high, low, formHigh, formLow, listItem};