"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputHighNode = document.querySelector('.form-high') || null;
const inputLowNode = document.querySelector('.form-low') || null;
const highTasksNode = document.querySelector('.high-tasks') || null;
const lowTasksNode = document.querySelector('.low-tasks') || null;
const inputHighTaskNode = document.querySelector('.input-task-high') || null;
const inputLowTaskNode = document.querySelector('.input-task-low') || null;
const logicTask_1 = require("./logicTask");
function closeBtnActions(taskName) {
    (0, logicTask_1.removeTask)(taskName);
    render();
}
function checkboxActions(checkbox, taskName) {
    const isChecked = checkbox.checked;
    (0, logicTask_1.changeStatus)(taskName, isChecked ? logicTask_1.statuses.DONE : logicTask_1.statuses.TODO);
    render();
}
/* Создание HTML элемента задачи */
function createTaskNode(text, status) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const textTask = document.createElement('p');
    textTask.innerText = text;
    const label = document.createElement('label');
    const closeBtnImg = document.createElement('img');
    closeBtnImg.src = './img/close-icon (1).svg';
    const closeBtnNode = document.createElement('button');
    closeBtnNode.appendChild(closeBtnImg);
    /* Вешаем слушатель на кнопку закрытия */
    closeBtnNode.addEventListener('click', closeBtnActions.bind(null, text));
    /* Вешаем слушатель на чекбокс */
    checkbox.addEventListener('change', checkboxActions.bind(null, checkbox, text));
    /* Делаем так чтобы при рендере выполненные задачи оставались выполненными */
    if (status === logicTask_1.statuses.DONE) {
        newTask.classList.add('done-task');
        checkbox.checked = true;
    }
    /* Собираем все воедино */
    label.appendChild(checkbox);
    label.appendChild(textTask);
    newTask.appendChild(label);
    newTask.appendChild(closeBtnNode);
    return newTask;
}
/* Функция рендера задач */
function render() {
    highTasksNode.innerHTML = '';
    lowTasksNode.innerHTML = '';
    for (const el of logicTask_1.list) {
        const nodeForAddTask = el.priority == logicTask_1.priorities.HIGH ? highTasksNode : lowTasksNode;
        const task = createTaskNode(el.name, el.status);
        nodeForAddTask.appendChild(task);
    }
}
/* Функции добавления задач при отправке форм */
function addTaskHigh(event) {
    event.preventDefault();
    (0, logicTask_1.addTask)(inputHighTaskNode.value, logicTask_1.statuses.TODO, logicTask_1.priorities.HIGH);
    inputHighTaskNode.value = '';
    render();
}
function addTaskLow(event) {
    event.preventDefault();
    (0, logicTask_1.addTask)(inputLowTaskNode.value, logicTask_1.statuses.TODO, logicTask_1.priorities.LOW);
    inputLowTaskNode.value = '';
    render();
}
inputHighNode.addEventListener('submit', addTaskHigh);
inputLowNode.addEventListener('submit', addTaskLow);
//render()
