const toDoList = [
];

let taskId = 0;

const userNotice = {
    'copyTask': 'Такая задача уже существует',
    'emptyString': 'Поле не заполнено'
}

// Список статусов
const listStatusTask = {
    toDo: 'Нужно выполнить',
    // inProgress: 'В процессе',
    done: 'Выполнено'
}

// Список приоритетов
const ListPriorityTask = {
    low: 'Низкий',
    // middle: 'Средний',
    high: 'Высокий',

}

const UI_ELEMNTS = {
    FORM_HIGH: document.querySelector('.form-high'),
    FORM_LOW: document.querySelector('.form-low'),
    INPUT_HIGH: document.querySelector('.input-add-high'),
    INPUT_LOW: document.querySelector('.input-add-low'),
    CONTAINER_TASKS_HIGH: document.querySelector('.list-tasks-high'),
    CONTAINER_TASKS_LOW: document.querySelector('.list-tasks-low'),
}

UI_ELEMNTS.FORM_HIGH.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(UI_ELEMNTS.FORM_HIGH, UI_ELEMNTS.INPUT_HIGH, UI_ELEMNTS.CONTAINER_TASKS_HIGH);
})

UI_ELEMNTS.FORM_LOW.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(UI_ELEMNTS.FORM_LOW, UI_ELEMNTS.INPUT_LOW, UI_ELEMNTS.CONTAINER_TASKS_LOW);
})


// Поиск совпадений
function foundTask(foundTask) {
    // Убираем чувствительность к регистру первой буквы, проверяем на совпадение.
    for (let i = 0; i < toDoList.length; i++) {
        if (foundTask.at(0).toLowerCase() + foundTask.slice(1) === toDoList[i].nameTask.at(0).toLowerCase() + toDoList[i].nameTask.slice(1)) {
            const foundedTask = toDoList[i];
            return foundedTask;
        }
    }
}

// Формируем данные из input формы
function getInputValue(form) {
    const formData = new FormData(form);
    const inputValue = formData.get('task-value');
    return inputValue;
}

// Проверка на пустоту
function isEmpty(inputValue) {
    const containsOnlySpaces = /^\s*$/.test(inputValue);
    if (!inputValue || inputValue === '' || containsOnlySpaces) {
        alert(userNotice.emptyString);
        return true;
    }
}

let error = new Error(" Ого, ошибка! o_O");

// Добавление элемента в массив
function addTask(form, input) {
    try {
        const inputData = getInputValue(form);
        if (isEmpty(inputData)) {
            return
        }
        // Проверяем на повторяемость
        if (foundTask(inputData) !== undefined) {
            alert(userNotice.copyTask);
            return;
        }
        const inputDataAtribute = input.dataset.priority;
        const newTask = {
            id: taskId,
            nameTask: inputData,
            statusTask: listStatusTask.toDo,
            priorityTask: inputDataAtribute === 'high' ? ListPriorityTask.high : ListPriorityTask.low
        }
        taskId++;
        toDoList.push(newTask);
        input.value = '';
        renderTasks();
    } catch(err) {
        console.log('Произошла ошибка: \n', err.name, '\n', err.stack);
    }
    
}

// Создание UI таски
function createTask(idTask, valueTask, statusTask) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.dataset.id = idTask;
    if (statusTask === listStatusTask.done) {
        task.classList.add('done');
    } else {
        task.classList.remove('done');
    }
    task.insertAdjacentHTML('afterbegin', ` 
                <div class="task__check">
                    <input type="checkbox" class="task__check-input" name="checkbox" ${statusTask === listStatusTask.toDo ? false : 'checked'}>
                </div>
                <div class="task__content">
                    ${valueTask}
                </div>
                <button type="button" class="btn-delete">
                    <img src="./source/icons/delete.svg" alt="Иконка крестика">
                </button>`);
    btnDelListener(task, idTask);
    return task;
}

// Отрисовка задач на клиенте
function renderTasks() {
    clearUiListTasks();
    toDoList.forEach((itemTask) => {
        if (itemTask.priorityTask === ListPriorityTask.high && itemTask.statusTask === listStatusTask.done) {
            UI_ELEMNTS.CONTAINER_TASKS_HIGH.append(createTask(itemTask.id, itemTask.nameTask, itemTask.statusTask));
        }
        else if (itemTask.priorityTask === ListPriorityTask.high && itemTask.statusTask === listStatusTask.toDo) {
            UI_ELEMNTS.CONTAINER_TASKS_HIGH.prepend(createTask(itemTask.id, itemTask.nameTask, itemTask.statusTask));
        }
        else if (itemTask.priorityTask === ListPriorityTask.low && itemTask.statusTask === listStatusTask.done) {
            UI_ELEMNTS.CONTAINER_TASKS_LOW.append(createTask(itemTask.id, itemTask.nameTask, itemTask.statusTask));
        }
        else if (itemTask.priorityTask === ListPriorityTask.low && itemTask.statusTask === listStatusTask.toDo) {
            UI_ELEMNTS.CONTAINER_TASKS_LOW.prepend(createTask(itemTask.id, itemTask.nameTask, itemTask.statusTask));
        }
    })
    checkboxListener();
}

//Очищаем список задач UI на клиенте 
function clearUiListTasks() {
    const uiTask = document.querySelectorAll('.task');
    uiTask.forEach(item => {
        item.remove();
    })
}

// Слушатель на кнопку удаления
function btnDelListener(task, idTask) {
    const btnDelete = task.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
        deleteTask(idTask);
    })
}

// Удаление задачи
function deleteTask(idTask) {
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].id === idTask) {
            const foundedTask = toDoList[i];
            let index = toDoList.indexOf(foundedTask);
            toDoList.splice(index, 1);
        }
    }
    renderTasks();
}

//Слушатель события на checkbox
function checkboxListener() {
    const allCheckbox = document.querySelectorAll('.task__check-input');
    allCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const statusCheked = checkbox.checked;
            const uiTask = checkbox.closest('.task');
            const dataIdTask = uiTask.dataset.id;
            if (statusCheked) {
                changeStatus(dataIdTask, statusCheked);
            } else {
                changeStatus(dataIdTask, statusCheked);
            }
        })
    })
}

// Изменение статуса задачи
function changeStatus(idTask, statusChecked) {
    for (let i = 0; i < toDoList.length; i++) {
        let foundedTask;
        if (toDoList[i].id === Number(idTask) && statusChecked === true) {
            foundedTask = toDoList[i];
            foundedTask.statusTask = listStatusTask.done;
        } else if (toDoList[i].id === Number(idTask) && statusChecked === false) {
            foundedTask = toDoList[i];
            foundedTask.statusTask = listStatusTask.toDo;
        }
    }
    renderTasks();
}
