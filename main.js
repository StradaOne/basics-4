import {
    formHighTodo,
    formLowTodo,
    formHighTaskTodo,
    formLowTaskTodo,
    textTaskHigh,
    textTaskLow,
    addClickTaskHigh,
    addClickTaskLow
} from "./formVariableToDo.js";

function addTaskHigh(event) {
    event.preventDefault();
    const textTask = textTaskHigh;
    const newTask = createTask(textTask);
    console.log(newTask);
    formHighTaskTodo.insertAdjacentHTML('afterbegin', newTask);
    textTaskHigh.value = '';
}

function addTaskLow(event) {
    event.preventDefault();
    const textTask = textTaskLow;
    const newTask = createTask(textTask);
    console.log(newTask);
    formLowTaskTodo.insertAdjacentHTML('afterbegin', newTask);
    textTaskLow.value = '';
}

function createTask(textTask) {
    const valueTask = textTask.value;
    console.log(valueTask);
    const elementTask = `
          <div class="task">
              <div class="task__info">
                <input type="checkbox"/>
                <p class="task__text">${valueTask}</p>
              </div>
              <img src="close-icon.svg" class="todo__del-img" />
        </div>`;
    return elementTask;
}


formHighTodo.addEventListener('submit', addTaskHigh);
formLowTodo.addEventListener('submit', addTaskLow);
addClickTaskHigh.addEventListener('click', addTaskHigh);
addClickTaskLow.addEventListener('click', addTaskLow);

