const btnAdd = document.querySelectorAll('.todo__add-img');
const input = document.querySelectorAll('.input');
const tasks = document.querySelectorAll('.tasks');
const form = document.querySelectorAll('form');

let priorities = ['high', 'low'];
let list = [];

window.addEventListener('click', deleteTask);
window.addEventListener('click', doneTask);

form.forEach(el => {
    el.addEventListener('submit', (e) => {
        for (let i = 0; i < form.length; i++) {
            if (e.target === form[i]) {
                e.preventDefault();
                addTask(input[i], tasks[i], priorities[i]);
            };
        };
    });
});

btnAdd.forEach(el => {
    el.addEventListener('click', (e) => {
        for (let i = 0; i < btnAdd.length; i++) {
            if (e.target === btnAdd[i]) {
                e.preventDefault();
                addTask(input[i], tasks[i], priorities[i]);
            };
        };
    });
});

function addTask(input, nodeTasks, priorityTask) {
    const taskText = input.value;

    const newTask = {
        id: Date.now(),
        value: taskText,
        done: false,
        priority: priorityTask,
    };

    list.push(newTask);
    renderTask(newTask, nodeTasks);
    renderDOM();

    input.value = '';
    input.focus();
};

function renderTask(task, nodeTasks) {
    const cssClass = task.done ? "task task--done" : "task";
    const taskNode = `
        <div class="${cssClass}" id="${task.id}">
          <div class="task__info">
            <input type="checkbox" class="checkbox"/>
            <p class="task__text">${task.value}</p>
          </div>
          <img src="images/close-icon.svg" class="todo__del-img" />
        </div>`;

    nodeTasks.insertAdjacentHTML('afterbegin', taskNode);
};

function deleteTask(e) {
    if (e.target.classList.contains('todo__del-img')) {
        const parentNode = e.target.closest('.task');

        const id = Number(parentNode.id);
        list = list.filter((task) => task.id !== id);
        parentNode.remove();
        renderDOM();
    };
};

function doneTask(e) {
    if (e.target.classList.contains('checkbox')) {
        const parentNode = e.target.closest('.task');

        const id = Number(parentNode.id);
        const task = list.find((task) => task.id === id);
        task.done = !task.done;

        parentNode.classList.toggle('task--done');
        renderDOM();
    };
};

function renderDOM() {
    const task = document.querySelectorAll('.task');
    task.forEach(el => el.remove());

    for (let i = 0; i < priorities.length; i++) {
        list.forEach((item) => {
            if (item.priority === priorities[i]) {
                const cssClass = item.done ? "task task--done" : "task";
                const taskNode = `
                <div class="${cssClass}" id="${item.id}">
                    <div class="task__info">
                        <input type="checkbox" class="checkbox"/>
                        <p class="task__text">${item.value}</p>
                    </div>
                    <img src="images/close-icon.svg" class="todo__del-img" />
                </div>`;

                tasks[i].insertAdjacentHTML('afterbegin', taskNode);
            };
        });
    };
};