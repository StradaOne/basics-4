// массив статусов
const STATUS = ['to do', 'done'];
// массив приоритетов
const PRIORITY = ['low', 'high'];


// import { TODOLIST } from "./module.js";
// массив задач со статусами и приоритетом
let TODOLIST = [
    {task : 'make a bed', status : 'to do', priority : 'high'},
    {task : 'bake pancakes', status : 'done', priority : 'low'},
    {task : 'groceries', status : 'to do', priority : 'high'},
    {task : 'buy contacts', status : 'done', priority : 'low'},
    {task : 'make a brief', status : 'to do', priority : 'low'},
    {task : 'walk a dog', status : 'to do', priority : 'low'},
    {task : 'feed a cat', status : 'done', priority : 'low'},
    {task : 'ride a whale', status : 'done', priority : 'high'},
];



// метод выведения ошибки
function error(){
    alert('AN ERROR OCURED!');
};
// проверки
const validation = {
    // проверка на строчность
    isString : function isString(value) {
        if (typeof(value)==='string'){
            return true;
        } else {return false};
    },
    // проверка на пустоту
    isEmpty : function isEmpty(value){
        if (value==='' || value==null) {
            return true;
        } else {return false};
    },
    //проверка на существование в списке статусов
    isInStatus : function isInStatus(status) {
        if (STATUS.includes(status)) {
            return true;
        } else {return false};
    },
    //проверка на существование в списке приоритетов
    isInPriority : function isInPriority(priority) {
        if (PRIORITY.includes(priority)) {
            return true;
        } else {return false};
    }, 
    //проверка на существование в списке задач
    isInTaskList : function isInTaskList(thetask) {
        const TASKARRAY = [];
        TODOLIST.forEach(item => {
            TASKARRAY.push(item.task);
        });
        if (TASKARRAY.includes(thetask)) {
            return true;
        } else {return false};
    },
};
// метод для добавления задачи
function addTask(thetask,status,priority) {
    // проверка строчности введенных данных
    if (validation.isString(thetask) && 
        validation.isString(status) && 
        validation.isString(priority) &&
        // проверка что введенные данные не пустые
        !validation.isEmpty(thetask) &&
        !validation.isEmpty(status) &&
        !validation.isEmpty(priority) &&
        // проверка наличия задания в списке
        !validation.isInTaskList(thetask) &&
        // проверка наличия статуса в списке
        validation.isInStatus(status) &&
        // проверка наличия приоритета в списке
        validation.isInPriority(priority)
        ) {
        TODOLIST.push({
            task : thetask,
            status : status,
            priority : priority
        });
        render();
    } else {return error()};
};
// метод для удаления задачи
function delTask(taskName) {
    if (validation.isInTaskList(taskName)) {
    TODOLIST = TODOLIST.filter(element => element.task !== taskName);
    render();
    } else {return error()};
};
// метод для смены статуса
function changeStatus(taskName, status) {
    let indexToChange = TODOLIST.findIndex(object => object.task === taskName);
    if (status === 'to do'){
        TODOLIST[indexToChange].status = 'done';
    } else if (status === 'done'){
        TODOLIST[indexToChange].status = 'to do';
    };
    render();
};

function addHighTaskClick(){
    addTask(document.getElementById('inputTaskHigh').value, 'to do', 'high');
    console.log(document.getElementById('inputTaskHigh').value);
};
function addLowTaskClick(){
    addTask(document.getElementById('inputTaskLow').value, 'to do', 'low');
    console.log(document.getElementById('inputTaskLow').value);
};

let container = document.createElement('div');
container.classList.add('container');
// метод рендера заголовка списка (высокого приоритета или низкого)
function listInputsRender(whatlist, text, actionAdd, inputId, buttonPlus, placeholder){
    let listDiv = document.createElement('div');
    listDiv.classList.add(whatlist);
    listDiv.setAttribute('id', whatlist);
    document.body.appendChild(container);
    container.appendChild(listDiv);
    let header = document.createElement('div');
    header.classList.add('highlight');
    listDiv.appendChild(header);
    header.innerText = text;
    let inputCell = document.createElement('form');
    inputCell.classList.add('cell');
    inputCell.classList.add('inputCell');
    inputCell.setAttribute('id', 'cell');
    inputCell.setAttribute('onsubmit', actionAdd);
    listDiv.appendChild(inputCell);
    let inputTaskAdd = document.createElement('input');
    inputTaskAdd.setAttribute('id', inputId);
    inputTaskAdd.setAttribute('placeholder', placeholder);
    inputTaskAdd.classList.add('input');
    let plus = document.createElement('div');
    plus.setAttribute('id', buttonPlus);
    plus.classList.add('plus');
    inputCell.appendChild(inputTaskAdd);
    inputCell.appendChild(plus);
}
// метод рендера новой ячейки
function cellAdd(theList, taskName, status){
    let newCell = document.createElement('div');
    let newCheckbox = document.createElement('input');
    let newDiv = document.createElement('div');
    let newCross = document.createElement('div');
    newCell.classList.add('cell');
    newCheckbox.classList.add('circle-check');
    newDiv.classList.add('theTask');
    newCross.classList.add('cross');
    newDiv.innerText = taskName;
    newCheckbox.setAttribute('type', 'checkbox');
    newCross.setAttribute('id', 'taskRemove');
    theList.appendChild(newCell);
    newCell.appendChild(newCheckbox);
    if (status === 'done'){
        newCheckbox.checked = true;
        newCell.style.backgroundColor = "#bbbbbb";
        newCell.style.color = "#777777";
    };
    newCheckbox.addEventListener('change', ()=>{
        changeStatus(taskName, status);
    });
    newCell.appendChild(newDiv);
    newCell.appendChild(newCross);
    newCross.addEventListener('click', ()=> {
        delTask(taskName);
    });
}

function render(){
    const indexHigh = TODOLIST.filter(object => object.priority === 'high');
    const indexLow = TODOLIST.filter(object => object.priority === 'low');
    container.innerHTML = '';
    listInputsRender('highlist', 'HIGH','addHighTaskClick()', 'inputTaskHigh', 'plusTaskHigh', 'Добавить важных дел');
    listInputsRender('lowlist', 'LOW', 'addLowTaskClick()', 'inputTaskLow', 'plusTaskLow', 'Добавить не важных дел');
    indexHigh.forEach(object => {
        cellAdd(highlist, object.task, object.status);
    });
    indexLow.forEach(object => {
        cellAdd(lowlist, object.task, object.status);
    });
    const buttonPlusHigh = document.getElementById('plusTaskHigh');
    const buttonPlusLow = document.getElementById('plusTaskLow');
    buttonPlusHigh.addEventListener('click', addHighTaskClick);
    buttonPlusLow.addEventListener('click', addLowTaskClick);
    console.clear();
    console.log(TODOLIST);
};
render();