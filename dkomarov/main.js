import {addItemsFormHigh, addItemsFormLow, taskBlockHigh, taskBlockLow} from "./modules/DOMelements.js";

const STATUS = {
    TODO: 'to do',
    DONE: 'done'
}

const PRIORITY = {
    HIGH: 'high',
    LOW: 'low'
}

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];


function addTask(text) {
    todoList.push(text);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    
};


//ФУНКЦИЯ КОНСТРУКТОР 
function Task(text, priority) {
    this.id = countId;
    this.name = text;
    this.checked = false;
    this.status = STATUS.TODO;
    this.priority = priority;
}


//добавление задачи с высоким приоритетом 
function addItemHigh(event) {
    event.preventDefault();
    const textHigh = event.target.itemHigh.value;
    const taskHigh = new Task(textHigh, PRIORITY.HIGH)
    addTask(taskHigh);
    render();
    this.reset();
};


//добавление задачи с низким приоритетом
function addItemLow(event) {
    event.preventDefault();
    const textLow = event.target.itemLow.value;
    const taskLow = new Task(textLow, PRIORITY.LOW);
    addTask(taskLow);
    render();
    this.reset();
};

let countId = 0;

//функция создания элемента с высоким приоритетом
function createItemHigh(taskBlockHigh, task, priority) {
    const newElement = document.createElement('div'); 
    const checkBox = document.createElement('input');
    const taskText = document.createElement('p');
    const delButton = document.createElement('button');
    const imgForDelButton = document.createElement('img');
    
    newElement.classList.add('add-items-form_high');
    checkBox.type = 'checkbox';
    // checkBox.id = `${countId++}`;
    taskText.textContent = task;
    delButton.classList.add('button_del');
    imgForDelButton.src = './image/free-icon-close-151882-444.svg';
    imgForDelButton.id = `${countId}`;
    delButton.id = `${countId++}`;
    
    newElement.appendChild(checkBox);
    newElement.appendChild(taskText);
    delButton.appendChild(imgForDelButton);
    newElement.appendChild(delButton);
    taskBlockHigh.appendChild(newElement);
    
    delButton.addEventListener('click', deleteTask);
    // checkBox.addEventListener('change', changeStatus);

    return taskBlockHigh;
};

//функция создания элемента с низким приоритетом 
function createItemLow(taskBlockLow, task, priority) {
    const newElement = document.createElement('div'); 
    const checkBox = document.createElement('input');
    const taskText = document.createElement('p');
    const delButton = document.createElement('button');
    const imgForDelButton = document.createElement('img');
    
    newElement.classList.add('add-items-form_high');
    checkBox.type = 'checkbox';
    // checkBox.id = `${countId++}`;
    taskText.textContent = task;
    delButton.classList.add('button_del');
    imgForDelButton.src = './image/free-icon-close-151882-444.svg';
    imgForDelButton.id = `${countId}`;
    delButton.id = `${countId++}`;
    
    newElement.appendChild(checkBox);
    newElement.appendChild(taskText);
    delButton.appendChild(imgForDelButton);
    newElement.appendChild(delButton);
    taskBlockLow.appendChild(newElement);
    
    delButton.addEventListener('click', deleteTask);
    // checkBox.addEventListener('change', changeStatus);

    return taskBlockLow;
};


//удаление элемента из массива 
function deleteTask(event) {
    const indexButton = event.target.getAttribute("id");
    console.log(indexButton);
    todoList.splice(indexButton, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    render();
};

//функция "отрисовки" html
function render() {
    countId = 0;
    taskBlockHigh.textContent = '';
    taskBlockLow.textContent = '';
    for (let obj of todoList) {
        obj.priority == PRIORITY.HIGH ?
        createItemHigh(taskBlockHigh, obj.name, obj.status) :
        createItemLow(taskBlockLow, obj.name, obj.status);
    };
    

    console.log(todoList);
};

//изменение статуса задачи по чекбоксу 
// function changeStatus(event) {
//    const elem = event.target.getAttribute('id');
//    if (elem === )  //допилить поиск по айди
//    console.log(elem)

// };

addItemsFormHigh.addEventListener('submit', addItemHigh);
addItemsFormLow.addEventListener('submit', addItemLow);

render();


