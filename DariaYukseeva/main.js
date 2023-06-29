const STATUSES = {
    TO_DO: 'To Do', 
    DONE: 'Done',
};

const PRIORITIES = {
    HIGH: "High",
    LOW: "Low",
};

let toDoList = getFromLocalStorage('toDoList') || [];

let taskId = getFromLocalStorage('id') || 0;

const taskExistenceMessage = 'Такая задача уже существует';

const mainToDo = getElement('.todo-list');
const highPriorityTasks = getElement('.tasks-high-priority');
const lowPriorityTasks = getElement('.tasks-low-priority');

const submitBtns = getElements('.btn-adding');
const inputsAddingTask = getElements('.adding-input');



// получает элементы из ДОМ
function getElement(selector) {
    return document.querySelector(selector);
}
function getElements(selector) {
    return document.querySelectorAll(selector);
}

// проверяет, что имя задачи валидное
function isTaskNameValid (taskName) {
    return !!taskName.trim();
}

// Находит индекс задачи:
function getTaskIndex(id) {
    const taskIndex = toDoList.findIndex(obj => 
    obj.id === +id);
 
    return taskIndex;   
}

function transferToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
    
}

// Функция-конструктор создаёт новый объект с задачей
function TaskObjectCreator(taskName, priority) {
    this.id = taskId;
    this.name = taskName;
    this.status = STATUSES.TO_DO;
    this.priority = priority;
}

// Функция добавления новой задачи. Принимает в качестве аргументов текст задачи, приоритет. Cтатус ставится по умолчанию TO_DO. Проверяем, валидное ли имя задачи. Если проверка пройдена, добавляем задачу:
function addTask(taskName, priority) {
    
    if (!isTaskNameValid(taskName)) {
        return;
    }
    
    const newTask = new TaskObjectCreator(taskName, priority);
    toDoList.push(newTask)
    // Увеличиваем id
    taskId++;
    transferToLocalStorage('id', taskId);
    transferToLocalStorage('toDoList', toDoList);
    console.log(`Добавлена новая задача ${newTask.name.substr(0, 20)}...`);
    console.log(taskId);
}

// Удаляет задачу. 
function deleteTask(id) {
    toDoList.splice(getTaskIndex(id), 1);
    // сделать всплывающее окно с предложением отменить удаление?   
    transferToLocalStorage('toDoList', toDoList); 
}

// Меняет статус задачи:
function setStatusTask(id, newStatus) {
    toDoList[getTaskIndex(id)].status = newStatus; 
    transferToLocalStorage('toDoList', toDoList);   
}

// Фильтрует задачи по приоритету
function filteringTasksByPriority(priority) {
    
    return toDoList.filter(obj => obj.priority === priority);
}

//сортирует массив по статусу
function sortTaskByStatus(arr) {
    
    const sortTasks = arr.sort((a) => {
        if (a.status === STATUSES.TO_DO) {
            return -1;
        }
        if (a.status === STATUSES.DONE) {
            return 1;
        }
    });
    return sortTasks;
}

// Добавляем отфильтрованные и отсортированные задачи в нужный блок по приоритету
function addTasksToDOM(priority, tasksBlock) {
    // фильтруем по приоритету
    const filteredTasksByPriority = filteringTasksByPriority(priority);
    // сортируем по статусу отфильтрованный ранее массив
    const sortedTasksByStatus = sortTaskByStatus(filteredTasksByPriority);
    
    // для каждой задачи добавляем data-id со значением id задачи и класс completed, если у задачи статус DONE. 
    if (sortedTasksByStatus.length !== 0) {
        sortedTasksByStatus.forEach(task => {
            let taskClasses = ['task-item'];
            if(task.status === STATUSES.DONE) {
                taskClasses.push('completed');
            }
            taskClasses = taskClasses.join(' ');
            // Добавляем элемент с задачей в HTML
            tasksBlock.insertAdjacentHTML('beforeend', `
                <div class="${taskClasses}" data-id="${task.id}">
                    <label>
                        <input type="checkbox"  class="input-checkbox" data-id="${task.id}">
                        <div class="task-text" >
                            ${task.name} 
                        </div>
                    </label>
                    <button class="btn-task-delete"></button>
                </div>
            `);
            
        });
    }
    return    
}

// рендерим ДОМ на основании данных из массива toDoList. 
function render() {
    // Удаляем все элементы с задачами
    highPriorityTasks.innerHTML = '';
    lowPriorityTasks.innerHTML = '';
    // добавляем задачи каждую в свой блок по приоритету
    addTasksToDOM(PRIORITIES.HIGH, highPriorityTasks);
    addTasksToDOM(PRIORITIES.LOW, lowPriorityTasks);
}

// Функция обработчика события для кнопки сабмит. 
const submitBtnHandler = (event) => {
    // Добавляет задачу 
    event.preventDefault();
    if (event.target === submitBtns[0]) {
        let taskName = inputsAddingTask[0].value;
        addTask(taskName, PRIORITIES.HIGH);
    }
    else if (event.target === submitBtns[1]) {
        let taskName = inputsAddingTask[1].value;
        addTask(taskName, PRIORITIES.LOW);
    }
    // очищает поле ввода и рендерит ДОМ
    inputsAddingTask.forEach(input => input.value = '');
    render();  
}

// повесили событие клик на кнопки сабмит
submitBtns.forEach(btn => btn.addEventListener('click', submitBtnHandler));

// Функция обработчика события на клик по задачам.   
const clickHandler = (event) => {
    // Если клик был сделан по элементу с классом input-checkbox, то вызывает функцию обработчика чекбоксов. Рендерит ДОМ 
    if (event.target.classList.contains('input-checkbox')) {
        checkboxHandler(event);
        render();
        return
    }
    // Если клик был на кнопку delete, то вызывает функцию обработчика для кнопки delete. Рендерит ДОМ 
    else if (event.target.classList.contains('btn-task-delete')) {
        btnDeleteHandler(event)
        render();
        return
    } 
}

// Функция обработчика события на клик для чекбокса.   
function checkboxHandler(event) {
    // Находит data-id выбранной задачи
    const checkedTaskId = event.target.getAttribute('data-id');
    // и статус выбранной задачи
    const checkedTaskStatus = toDoList.find(obj => obj.id === +checkedTaskId).status;
    // Если статус TO_DO, то меняем его на Done и наоборот.
    setStatusTask(checkedTaskId, checkedTaskStatus === STATUSES.TO_DO ? STATUSES.DONE : STATUSES.TO_DO)
}

// Функция обработчика события на клик для кнопки delete.  
function btnDeleteHandler(event) {
    // Находит id удаляемой задачи
    const deletedTaskId = +event.target.parentElement.getAttribute('data-id');
    // этот id передаёт в функцию удаления задач из массива.
    deleteTask(deletedTaskId);
}

// Повесили событие клик на туду лист 
mainToDo.addEventListener('click', clickHandler);

function init() {
    render();
}

init ();