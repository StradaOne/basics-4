import {getElement, high, low, formHigh, formLow, listItem} from './elements.js';
import {STATUS, PRIORITY, ERROR} from './constants.js';

function showElements(data){
    data.forEach(item => {
        showElement(item.prioritу, item.status, item.task)
    });
}

function showElement(prioritу, status, task){
    if(prioritу === PRIORITY.HIGH){
        high.insertAdjacentHTML('beforeEnd', createElement(status, task))
    }
    if(prioritу === PRIORITY.LOW){
        low.insertAdjacentHTML('beforeEnd', createElement(status, task))
    }
}

function createElement(status, task){
    return `<div class="list-item">
                <div class="item-checkbox ${status}"></div>
                <div class="item-text">${task}</div>
                <div class="item-btn"></div>
            </div>`;
}

function deleteElemntsUi(){
    const listItems = document.querySelectorAll('.list-item');
    for(const item of listItems){
        item.remove()
    }
}

export {showElements, showElement, deleteElemntsUi};